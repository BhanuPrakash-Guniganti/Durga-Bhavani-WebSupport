import http from 'http';

const routes = [
  '/',
  '/about',
  '/history',
  '/years',
  '/years/2025',
  '/years/2024',
  '/years/2026',
  '/albums/devi-alankaranalu-2025',
  '/albums/auction-winners-2025',
  '/albums/donors-and-sponsors-2025',
  '/contact',
  '/search',
  '/admin/login'
];

async function checkRoute(route) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:4173${route}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          route,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          hasRoot: data.includes('id="root"'),
          hasTitle: data.includes('<title>')
        });
      });
    }).on('error', reject);
  });
}

console.log('Testing Preview Server Routes (SPA /index.html fallbacks):');
let allOk = true;

for (const r of routes) {
  try {
    const res = await checkRoute(r);
    const ok = res.statusCode === 200 && res.hasRoot;
    console.log(`[${ok ? 'OK' : 'FAIL'}] Route: ${r.padEnd(35)} -> Status: ${res.statusCode}, has #root: ${res.hasRoot}`);
    if (!ok) allOk = false;
  } catch (err) {
    console.error(`[ERROR] Route: ${r} -> ${err.message}`);
    allOk = false;
  }
}

if (!allOk) {
  process.exit(1);
} else {
  console.log('\nAll 13 routes return 200 OK and successfully deliver the SPA root HTML!');
}
