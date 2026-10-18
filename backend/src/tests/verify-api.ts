import http from 'http';
import { createApp } from '../app.js';
import { env } from '../config/env.js';

interface HttpResponse {
  status: number;
  body: any;
}

const makeRequest = (
  serverUrl: string,
  method: string,
  path: string,
  headers: Record<string, string> = {},
  data?: any
): Promise<HttpResponse> => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, serverUrl);
    const postData = data ? (typeof data === 'string' ? data : JSON.stringify(data)) : undefined;

    const reqHeaders: Record<string, string> = {
      ...headers
    };
    if (postData && !reqHeaders['Content-Type']) {
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(postData).toString();
    }

    const req = http.request(
      url,
      {
        method,
        headers: reqHeaders
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          let body = raw;
          try {
            body = JSON.parse(raw);
          } catch {}
          resolve({ status: res.statusCode || 0, body });
        });
      }
    );

    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
};

const runVerification = async () => {
  console.log('=== Starting Durga Bhavani Seva API Verification ===\n');

  const app = createApp();
  const server = app.listen(0);
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 5000;
  const baseUrl = `http://127.0.0.1:${port}`;

  let passed = 0;
  let failed = 0;

  const assert = (name: string, condition: boolean, detail?: string) => {
    if (condition) {
      console.log(`[PASS] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name} ${detail ? `- ${detail}` : ''}`);
      failed++;
    }
  };

  try {
    // 1. Health Check
    const health = await makeRequest(baseUrl, 'GET', '/api/v1/health');
    assert('1. Health check returns 200 healthy', health.status === 200 && health.body.status === 'healthy');

    // 2. Reject unapproved email from administrator login
    const unapproved = await makeRequest(baseUrl, 'POST', '/api/v1/auth/login', {}, {
      email: 'hacker@random-domain.com',
      password: 'somepassword'
    });
    assert(
      '2. Unapproved email login rejected with 403 Forbidden',
      unapproved.status === 403 && unapproved.body?.error?.code === 'UNAPPROVED_ADMIN',
      `Got status ${unapproved.status}, code: ${unapproved.body?.error?.code}`
    );

    // 3. Reject approved email with wrong password
    const wrongPass = await makeRequest(baseUrl, 'POST', '/api/v1/auth/login', {}, {
      email: env.INITIAL_ADMIN_EMAIL,
      password: 'wrong_password_123'
    });
    assert(
      '3. Approved email with invalid password rejected with 401 Unauthorized',
      wrongPass.status === 401 && wrongPass.body?.error?.code === 'INVALID_CREDENTIALS',
      `Got status ${wrongPass.status}, code: ${wrongPass.body?.error?.code}`
    );

    // 4. Successful login for authorized admin
    const loginRes = await makeRequest(baseUrl, 'POST', '/api/v1/auth/login', {}, {
      email: env.INITIAL_ADMIN_EMAIL,
      password: env.INITIAL_ADMIN_PASSWORD
    });
    assert(
      '4. Approved administrator login succeeds with 200 and returns valid JWT token',
      loginRes.status === 200 && Boolean(loginRes.body?.data?.token),
      `Got status ${loginRes.status}, data: ${JSON.stringify(loginRes.body)}`
    );
    const token = loginRes.body?.data?.token;

    // 5. Admin API rejects unauthenticated requests
    const unauthAlbums = await makeRequest(baseUrl, 'GET', '/api/v1/admin/albums');
    assert(
      '5. Admin albums endpoint rejects unauthenticated request with 401 Unauthorized',
      unauthAlbums.status === 401 && unauthAlbums.body?.error?.code === 'UNAUTHORIZED',
      `Got status ${unauthAlbums.status}`
    );

    // 6. Admin API allows request with valid JWT token
    const authAlbums = await makeRequest(baseUrl, 'GET', '/api/v1/admin/albums', {
      Authorization: `Bearer ${token}`
    });
    assert(
      '6. Admin albums endpoint succeeds with 200 when authenticated',
      authAlbums.status === 200 && Array.isArray(authAlbums.body?.data),
      `Got status ${authAlbums.status}`
    );

    // 7. Public Auctions API strictly returns confirmed published records only (draft isolation)
    const publicAuctions = await makeRequest(baseUrl, 'GET', '/api/v1/auctions');
    const returnedItems = publicAuctions.body?.data || [];
    const hasIncomplete = returnedItems.some((item: any) => !item.isComplete || item.status !== 'published');
    assert(
      '7. Public auctions API returns ONLY confirmed published records (11 items, drafts excluded)',
      publicAuctions.status === 200 && returnedItems.length === 11 && !hasIncomplete,
      `Returned ${returnedItems.length} items, has incomplete: ${hasIncomplete}`
    );

    // 8. Admin Auctions API returns full records including drafts
    const adminAuctions = await makeRequest(baseUrl, 'GET', '/api/v1/admin/auctions', {
      Authorization: `Bearer ${token}`
    });
    const adminItems = adminAuctions.body?.data || [];
    assert(
      '8. Admin auctions API returns all 15 records including drafts',
      adminAuctions.status === 200 && adminItems.length === 15,
      `Returned ${adminItems.length} records`
    );

    // 9. Media upload rejects unauthenticated requests
    const unauthUpload = await makeRequest(baseUrl, 'POST', '/api/v1/admin/media/upload');
    assert(
      '9. Media upload rejects unauthenticated requests with 401 Unauthorized',
      unauthUpload.status === 401,
      `Got status ${unauthUpload.status}`
    );

    // 10. Media storage status check
    const mediaStatus = await makeRequest(baseUrl, 'GET', '/api/v1/admin/media/status', {
      Authorization: `Bearer ${token}`
    });
    assert(
      '10. Media status returns provider status for authenticated admin',
      mediaStatus.status === 200 && mediaStatus.body?.data?.provider === 'cloudinary',
      `Got status ${mediaStatus.status}`
    );
  } finally {
    server.close();
  }

  console.log(`\n=== Verification Complete: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) {
    process.exit(1);
  }
};

runVerification().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
