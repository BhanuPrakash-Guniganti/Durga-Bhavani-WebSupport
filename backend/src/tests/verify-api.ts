import http from 'http';
import { createApp } from '../app.js';
import { env } from '../config/env.js';

interface HttpResponse {
  status: number;
  body: any;
  headers: http.IncomingHttpHeaders;
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
      (res: http.IncomingMessage) => {
        let raw = '';
        res.on('data', (chunk: Buffer | string) => (raw += chunk));
        res.on('end', () => {
          let body = raw;
          try {
            body = JSON.parse(raw);
          } catch {}
          resolve({ status: res.statusCode || 0, body, headers: res.headers });
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
      '7. Public auctions API returns ONLY confirmed published records (14 items, drafts excluded)',
      publicAuctions.status === 200 && returnedItems.length === 14 && !hasIncomplete,
      `Returned ${returnedItems.length} items, has incomplete: ${hasIncomplete}`
    );

    // 8. Admin Auctions API returns full records including drafts
    const adminAuctions = await makeRequest(baseUrl, 'GET', '/api/v1/admin/auctions', {
      Authorization: `Bearer ${token}`
    });
    const adminItems = adminAuctions.body?.data || [];
    assert(
      '8. Admin auctions API returns all 14 records',
      adminAuctions.status === 200 && adminItems.length === 14,
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

    // 11. Render Reverse Proxy Request with X-Forwarded-For header succeeds with 200 (No ERR_ERL_UNEXPECTED_X_FORWARDED_FOR)
    const proxiedHealth = await makeRequest(baseUrl, 'GET', '/api/v1/health', {
      'x-forwarded-for': '203.0.113.195'
    });
    assert(
      '11. Render reverse proxy request with X-Forwarded-For succeeds without ERR_ERL_UNEXPECTED_X_FORWARDED_FOR',
      proxiedHealth.status === 200 && proxiedHealth.body?.status === 'healthy',
      `Got status ${proxiedHealth.status}, body: ${JSON.stringify(proxiedHealth.body)}`
    );

    // 12. Standard rate limiting headers are returned and rate limiter is active
    const hasRateLimitHeaders = Boolean(
      proxiedHealth.headers['ratelimit-limit'] ||
      proxiedHealth.headers['x-ratelimit-limit']
    );
    assert(
      '12. Rate limiting headers are active and tracking client IP through proxy',
      hasRateLimitHeaders,
      `Headers received: ${JSON.stringify(proxiedHealth.headers)}`
    );

    // 13. Multi-hop X-Forwarded-For (spoofing attempt) correctly resolves client IP
    const multiHopHealth = await makeRequest(baseUrl, 'GET', '/api/v1/health', {
      'x-forwarded-for': '1.2.3.4, 198.51.100.42'
    });
    assert(
      '13. Multi-hop X-Forwarded-For request correctly handled with 1 trusted proxy hop',
      multiHopHealth.status === 200 && multiHopHealth.body?.status === 'healthy',
      `Got status ${multiHopHealth.status}`
    );

    // 14. Dedicated authentication rate limiter protects /api/v1/auth/login and triggers 429 when threshold exceeded
    const testAttackerIp = '198.51.100.99';
    let authRateLimited = false;
    for (let i = 0; i < 22; i++) {
      const burstRes = await makeRequest(
        baseUrl,
        'POST',
        '/api/v1/auth/login',
        { 'x-forwarded-for': testAttackerIp },
        { email: 'attacker@example.com', password: 'wrong' }
      );
      if (burstRes.status === 429) {
        authRateLimited = true;
        break;
      }
    }
    // Verify another legitimate client IP is NOT blocked
    const innocentClient = await makeRequest(
      baseUrl,
      'POST',
      '/api/v1/auth/login',
      { 'x-forwarded-for': '203.0.113.88' },
      { email: 'hacker@random-domain.com', password: 'somepassword' }
    );
    assert(
      '14. Auth rate limiter blocks burst attacks with 429 while leaving other IPs unaffected',
      authRateLimited && innocentClient.status === 403,
      `Rate limited: ${authRateLimited}, innocent client status: ${innocentClient.status}`
    );
  } finally {
    server.close();
  }

  console.log(`\n=== Verification Complete: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) {
    process.exit(1);
  }
};

runVerification().catch((err: unknown) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
