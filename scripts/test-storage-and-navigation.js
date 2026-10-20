import assert from 'assert';

console.log('===========================================================');
console.log('Task 4 Verification: Storage Resilience & Avatars Integrity');
console.log('===========================================================\n');

let testsPassed = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✅ [PASS] ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`❌ [FAIL] ${name}:`, err.message);
    process.exitCode = 1;
  }
}

// Mock localStorage with QuotaExceeded simulation
class MockStorage {
  constructor() {
    this.store = new Map();
    this.shouldThrowQuota = false;
  }
  get length() {
    return this.store.size;
  }
  key(index) {
    return Array.from(this.store.keys())[index] || null;
  }
  getItem(key) {
    return this.store.get(key) || null;
  }
  setItem(key, value) {
    if (this.shouldThrowQuota) {
      const err = new Error("Failed to execute 'setItem' on 'Storage': Setting the value exceeded the quota.");
      err.name = 'QuotaExceededError';
      err.code = 22;
      throw err;
    }
    this.store.set(key, String(value));
  }
  removeItem(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
}

const mockStorage = new MockStorage();
global.window = {
  localStorage: mockStorage
};

// Import storage module
const {
  safeStorage,
  cleanupObsoleteCache,
  sanitizeAvatars,
  sanitizeAlbums,
  sanitizeAuctions,
  sanitizeDonors,
  sanitizeYears,
  isBase64DataUrl,
  stripBase64FromPhotos
} = await import('../frontend/src/utils/storage.ts');

// 1. Test base64 detector
test('isBase64DataUrl accurately identifies base64 data URLs', () => {
  assert.strictEqual(isBase64DataUrl('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...'), true);
  assert.strictEqual(isBase64DataUrl('data:image/png;base64,iVBORw0KGgo...'), true);
  assert.strictEqual(isBase64DataUrl('https://res.cloudinary.com/demo/image/upload/sample.jpg'), false);
  assert.strictEqual(isBase64DataUrl('/images/covers/cover-devi-alankaranalu.webp'), false);
  assert.strictEqual(isBase64DataUrl(undefined), false);
  assert.strictEqual(isBase64DataUrl(null), false);
});

// 2. Test stripBase64FromPhotos
test('stripBase64FromPhotos purges any base64 URLs while keeping hosted images', () => {
  const photos = [
    { id: '1', url: 'data:image/jpeg;base64,12345', caption: 'b64', altText: 'b64', isSample: false },
    { id: '2', url: 'https://res.cloudinary.com/sample.jpg', caption: 'hosted', altText: 'hosted', isSample: false }
  ];
  const cleaned = stripBase64FromPhotos(photos);
  assert.strictEqual(cleaned.length, 1);
  assert.strictEqual(cleaned[0].id, '2');
  assert.strictEqual(cleaned[0].url, 'https://res.cloudinary.com/sample.jpg');
});

// 3. Test safeStorage rejecting base64 writes
test('safeStorage.setItem rejects storing base64 strings to prevent quota explosion', () => {
  mockStorage.clear();
  const base64Data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
  const result = safeStorage.setItem('durga_bhavani_test_b64', base64Data);
  assert.strictEqual(result, false, 'Should return false when attempting to write base64');
  assert.strictEqual(mockStorage.getItem('durga_bhavani_test_b64'), null);
});

// 4. Test safeStorage catching QuotaExceededError without throwing
test('safeStorage.setItem catches QuotaExceededError and recovers without crashing', () => {
  mockStorage.clear();
  mockStorage.shouldThrowQuota = true;
  let didThrow = false;
  try {
    const success = safeStorage.setItem('durga_bhavani_test_key', 'some value');
    assert.strictEqual(success, false, 'Should return false when quota is exceeded');
  } catch (err) {
    didThrow = true;
  }
  assert.strictEqual(didThrow, false, 'safeStorage.setItem must NEVER throw QuotaExceededError to caller');
  mockStorage.shouldThrowQuota = false;
});

// 5. Test obsolete application cache cleanup
test('cleanupObsoleteCache removes durga_bhavani_avatars_v4 and legacy caches safely', () => {
  mockStorage.clear();
  // Populate with obsolete application keys and one third-party key
  mockStorage.setItem('durga_bhavani_avatars_v4', '{"oversized": true}');
  mockStorage.setItem('durga_bhavani_albums_v5', '{"albums": []}');
  mockStorage.setItem('durga_bhavani_avatars_v1', '{"old": true}');
  mockStorage.setItem('durga_bhavani_language', 'te');
  mockStorage.setItem('durga_bhavani_admin_token', 'jwt-test-token');
  mockStorage.setItem('unrelated_site_key', 'unrelated_data');

  cleanupObsoleteCache(false);

  // Test obsolete auctions_meta_v1 and albums_meta_v1 eviction
  mockStorage.setItem('durga_bhavani_auctions_meta_v1', '[{"stale": true}]');
  mockStorage.setItem('durga_bhavani_albums_meta_v1', '[{"stale": true}]');
  cleanupObsoleteCache(false);
  assert.strictEqual(mockStorage.getItem('durga_bhavani_auctions_meta_v1'), null, 'stale auctions_meta_v1 MUST be removed');
  assert.strictEqual(mockStorage.getItem('durga_bhavani_albums_meta_v1'), null, 'stale albums_meta_v1 MUST be removed');

  assert.strictEqual(mockStorage.getItem('durga_bhavani_avatars_v4'), null, 'v4 cache should be removed');
  assert.strictEqual(mockStorage.getItem('durga_bhavani_albums_v5'), null, 'old albums_v5 should be removed');
  assert.strictEqual(mockStorage.getItem('durga_bhavani_avatars_v1'), null, 'v1 cache should be removed');
  assert.strictEqual(mockStorage.getItem('durga_bhavani_language'), 'te', 'language preference MUST be preserved');
  assert.strictEqual(mockStorage.getItem('durga_bhavani_admin_token'), 'jwt-test-token', 'auth token MUST be preserved');
  assert.strictEqual(mockStorage.getItem('unrelated_site_key'), 'unrelated_data', 'unrelated site storage MUST NOT be touched');
});

// 6. Test avatar sanitization and order preservation
const { sampleAvatars2025, sampleAuctionItems2024, sampleAuctionItems2025, sampleAuctionItems, sampleAlbums } = await import('../frontend/src/data/sampleData.ts');

test('Preserves all 11 published 2025 Devi avatars and their exact sequence', () => {
  assert.strictEqual(sampleAvatars2025.length, 11, 'Must have exactly 11 avatars for 2025');

  const expectedNames = [
    'Sri Bala Tripura Sundari Devi',
    'Sri Gayatri Devi',
    'Sri Annapurna Devi',
    'Sri Katyayani Devi',
    'Sri Mahalakshmi Devi',
    'Sri Lalitha Tripura Sundari Devi',
    'Sri Maha Chandi Devi',
    'Sri Saraswati Devi',
    'Sri Durga Devi',
    'Sri Mahishasura Mardini Devi',
    'Sri Raja Rajeshwari Devi'
  ];

  sampleAvatars2025.forEach((av, idx) => {
    assert.strictEqual(av.dayNumber, idx + 1, `Day ${idx + 1} dayNumber mismatch`);
    assert.strictEqual(av.sortOrder, idx + 1, `Day ${idx + 1} sortOrder mismatch`);
    assert.strictEqual(av.name.en, expectedNames[idx], `Day ${idx + 1} name mismatch`);
    assert.strictEqual(av.status, 'published', `Day ${idx + 1} must be published`);
  });

  const sanitized = sanitizeAvatars(sampleAvatars2025);
  assert.strictEqual(sanitized.length, 11);
  sanitized.forEach((av, idx) => {
    assert.strictEqual(Array.isArray(av.photos), true);
    assert.strictEqual(av.name.en, expectedNames[idx]);
  });
});

test('Validates 2024 and 2025 auction records count and data integrity', () => {
  assert.strictEqual(sampleAuctionItems2024.length, 14, 'Must have exactly 14 auction records for 2024');
  assert.strictEqual(sampleAuctionItems2025.length, 14, 'Must have exactly 14 auction records for 2025');
  assert.strictEqual(sampleAuctionItems.length, 28, 'Must have exactly 28 auction records total');

  // Verify 2024 special items and sarees
  const special2024 = sampleAuctionItems2024.filter((a) => a.itemType === 'special_item');
  const sarees2024 = sampleAuctionItems2024.filter((a) => a.itemType === 'saree');
  assert.strictEqual(special2024.length, 4, '2024 must have 4 special item auctions (Mukku Pudaka, Kalasham, Dhanalakshmi Maala, etc.)');
  assert.strictEqual(sarees2024.length, 10, '2024 must have 10 saree auctions');

  // Verify 2025 special items and sarees (11 sarees including Medalu Meeda Cheera + 3 festival special items)
  const special2025 = sampleAuctionItems2025.filter((a) => a.itemType === 'special_item');
  const sarees2025 = sampleAuctionItems2025.filter((a) => a.itemType === 'saree');
  assert.strictEqual(special2025.length, 3, '2025 must have 3 special item auctions (Kalasham, Mukku Pudaka, Laddu Prasad)');
  assert.strictEqual(sarees2025.length, 11, '2025 must have 11 saree auctions (10 avatar sarees + Medalu Meeda Cheera)');

  const sanitized = sanitizeAuctions(sampleAuctionItems);
  assert.strictEqual(sanitized.length, 28);
  assert.strictEqual(sanitized.filter((a) => a.year === 2024).length, 14);
  assert.strictEqual(sanitized.filter((a) => a.year === 2025).length, 14);
});

test('Verifies 2024 album updates: Sri Chandi Homam removed and video recap renamed', () => {
  const albums2024 = sampleAlbums.filter((a) => a.year === 2024);
  assert.strictEqual(albums2024.length, 3, '2024 must have exactly 3 albums (Devi Alankaranalu, Auction Winners & Video Recap)');

  // Ensure Sri Chandi Homam & Vedic Rituals 2024 is completely removed
  const chandiAlbum = sampleAlbums.find((a) => a.id === 'alb-2024-02' || a.slug === 'chandi-homam-rituals-2024');
  assert.strictEqual(chandiAlbum, undefined, 'Sri Chandi Homam 2024 album must NOT exist');

  // Verify renamed video recap album
  const recapAlbum = sampleAlbums.find((a) => a.id === 'alb-2024-01');
  assert.notStrictEqual(recapAlbum, undefined, '2024 video recap album alb-2024-01 must exist');
  assert.strictEqual(recapAlbum?.title.en, 'Devi Navaratri Utsav 2024 – 9-Day Celebration Recap');
  assert.strictEqual(recapAlbum?.title.te, 'దేవీ నవరాత్రి ఉత్సవాలు 2024 – తొమ్మిది రోజుల వేడుకల సమీక్ష');
  assert.strictEqual(recapAlbum?.videoUrl, 'https://youtu.be/dpYr12ArtVY');

  // Test sanitizeAlbums purges obsolete chandi homam even if present in legacy array
  const legacyAlbums = [
    { id: 'alb-2024-02', slug: 'chandi-homam-rituals-2024', title: { en: 'Old Chandi', te: 'పాత చండీ' }, year: 2024, coverImage: '', photoCount: 0, photos: [], status: 'published', isSample: true },
    recapAlbum
  ];
  const sanitized = sanitizeAlbums(legacyAlbums);
  assert.strictEqual(sanitized.length, 1, 'sanitizeAlbums must filter out alb-2024-02');
  assert.strictEqual(sanitized[0].id, 'alb-2024-01');
  assert.strictEqual(sanitized[0].videoUrl, 'https://youtu.be/dpYr12ArtVY');
});

console.log('\n===========================================================');
console.log(`Results: ${testsPassed} / ${totalTests} tests passed.`);
console.log('===========================================================');

if (testsPassed === totalTests) {
  console.log('🎉 ALL STORAGE & DATA RESILIENCE TESTS PASSED SUCCESSFULLY!\n');
} else {
  process.exit(1);
}
