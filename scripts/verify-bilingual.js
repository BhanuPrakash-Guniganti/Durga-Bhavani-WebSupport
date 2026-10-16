import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const enLocalePath = path.join(rootDir, 'frontend', 'src', 'locales', 'en', 'common.json');
const teLocalePath = path.join(rootDir, 'frontend', 'src', 'locales', 'te', 'common.json');
const sampleDataPath = path.join(rootDir, 'frontend', 'src', 'data', 'sampleData.ts');

console.log('===========================================================');
console.log('Durga Bhavani Seva Samiti - Bilingual Verification Suite');
console.log('===========================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`❌ [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. Verify JSON locale file existence and parity
assert(fs.existsSync(enLocalePath), 'English locale file exists');
assert(fs.existsSync(teLocalePath), 'Telugu locale file exists');

const enJson = JSON.parse(fs.readFileSync(enLocalePath, 'utf8'));
const teJson = JSON.parse(fs.readFileSync(teLocalePath, 'utf8'));

function checkKeys(enObj, teObj, prefix = '') {
  for (const key of Object.keys(enObj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof enObj[key] === 'object' && enObj[key] !== null) {
      assert(teObj && typeof teObj[key] === 'object', `Telugu key group exists: ${fullKey}`);
      if (teObj && teObj[key]) {
        checkKeys(enObj[key], teObj[key], fullKey);
      }
    } else {
      assert(
        teObj && typeof teObj[key] === 'string' && teObj[key].trim().length > 0,
        `Telugu translation non-empty for: ${fullKey}`
      );
    }
  }
}

console.log('\n--- Checking Locale Key Parity ---');
checkKeys(enJson, teJson);

// 2. Cultural Content and Celebration Accuracy Check
console.log('\n--- Checking Cultural Content & Milestone Accuracy ---');

// Correct Celebration Name
assert(
  enJson.history.title === 'History of Sri Durga Bhavani Utsav - Dodlapahad',
  'English celebration name is exact: "History of Sri Durga Bhavani Utsav - Dodlapahad"'
);
assert(
  teJson.history.title === 'శ్రీ దుర్గాభవాని ఉత్సవాల చరిత్ర - దొడ్లపహాడ్',
  'Telugu celebration name is exact: "శ్రీ దుర్గాభవాని ఉత్సవాల చరిత్ర - దొడ్లపహాడ్"'
);

// Celebration years milestones
assert(enJson.common.firstYear === 'First Year', 'English 2024 milestone label is "First Year"');
assert(enJson.common.secondYear === 'Second Year', 'English 2025 milestone label is "Second Year"');
assert(enJson.common.thirdYear === 'Third Year', 'English 2026 milestone label is "Third Year"');

assert(teJson.common.firstYear === 'మొదటి సంవత్సరం', 'Telugu 2024 milestone label is "మొదటి సంవత్సరం"');
assert(teJson.common.secondYear === 'రెండవ సంవత్సరం', 'Telugu 2025 milestone label is "రెండవ సంవత్సరం"');
assert(teJson.common.thirdYear === 'మూడవ సంవత్సరం', 'Telugu 2026 milestone label is "మూడవ సంవత్సరం"');

// 3. Sample Data Bilingual Verification
console.log('\n--- Checking sampleData.ts Bilingual Integrity ---');
const sampleDataContent = fs.readFileSync(sampleDataPath, 'utf8');

assert(sampleDataContent.includes('History of Sri Durga Bhavani Utsav - Dodlapahad'), 'sampleData includes English celebration heading');
assert(sampleDataContent.includes('శ్రీ దుర్గాభవాని ఉత్సవాల చరిత్ర - దొడ్లపహాడ్'), 'sampleData includes Telugu celebration heading');
assert(sampleDataContent.includes('మొదటి సంవత్సరం'), 'sampleData includes "మొదటి సంవత్సరం"');
assert(sampleDataContent.includes('రెండవ సంవత్సరం'), 'sampleData includes "రెండవ సంవత్సరం"');
assert(sampleDataContent.includes('మూడవ సంవత్సరం'), 'sampleData includes "మూడవ సంవత్సరం"');

// Ensure temple establishment is not incorrectly attributed to 2024
assert(
  !sampleDataContent.includes('temple was established in 2024') &&
  !sampleDataContent.includes('temple itself was established in 2024'),
  'Does not claim temple itself was established in 2024 (only annual celebrations began in 2024)'
);

console.log('\n===========================================================');
console.log(`Results: ${passedTests} / ${totalTests} assertions passed.`);
console.log('===========================================================');

if (passedTests === totalTests) {
  console.log('🎉 ALL BILINGUAL AUDIT CHECKS PASSED SUCCESSFULLY!\n');
} else {
  console.error('⚠️ SOME CHECKS FAILED!\n');
  process.exit(1);
}
