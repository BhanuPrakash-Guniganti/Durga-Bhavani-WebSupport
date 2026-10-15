#!/usr/bin/env node

/**
 * Phase 0 Workspace & Project Setup Verification Script
 * Checks directory layout, key files, configs, and environment templates.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const requiredFiles = [
  '.gitignore',
  'README.md',
  'IMPLEMENTATION_PLAN.md',
  'SECURITY.md',
  'DEPLOYMENT.md',
  '.env.example',
  'package.json',
  'docs/ARCHITECTURE.md',
  'docs/API_CONTRACTS.md',
  'docs/DATABASE_SCHEMA.md',
  'docs/DESIGN_SYSTEM.md',
  'backend/package.json',
  'backend/tsconfig.json',
  'backend/.env.example',
  'backend/src/index.ts',
  'backend/src/app.ts',
  'backend/src/config/env.ts',
  'frontend/package.json',
  'frontend/tsconfig.json',
  'frontend/vite.config.ts',
  'frontend/.env.example'
];

console.log('========================================================');
console.log('Durga Bhavani Seva Samiti - Dodlapahad');
console.log('Phase 0 Verification: Checking Project Skeleton...');
console.log('========================================================\n');

let missingCount = 0;

for (const relPath of requiredFiles) {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    console.log(`  [OK] ${relPath}`);
  } else {
    console.error(`  [MISSING] ${relPath}`);
    missingCount++;
  }
}

console.log('\n--------------------------------------------------------');
if (missingCount === 0) {
  console.log(' SUCCESS: All Phase 0 required files and structures exist!');
  console.log(' Ready for Phase 1 (Public Website UI).');
  console.log('--------------------------------------------------------\n');
  process.exit(0);
} else {
  console.error(` FAILURE: ${missingCount} required file(s) are missing.`);
  console.log('--------------------------------------------------------\n');
  process.exit(1);
}
