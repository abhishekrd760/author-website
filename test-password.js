const bcrypt = require('bcryptjs');

// Test password verification
const password = 'admin123';
const hash = '$2b$10$58A2b0bwGbPLRI/MSFOOC.e9kxO/N0c0bKrQdV0XYHH1TlJrkZTbW';

console.log('Testing password verification...');
console.log('Password:', password);
console.log('Hash:', hash);

const isValid = bcrypt.compareSync(password, hash);
console.log('Is valid:', isValid);

// Also test with original hash that was in the database
const originalHash = '$2b$10$udHJTk8AXEWyP8DWow5VoOR6BQ9euB8VGlsiDjNMLLhigW09Sy6Ge';
console.log('\nTesting with original hash...');
console.log('Original hash:', originalHash);
const isValidOriginal = bcrypt.compareSync(password, originalHash);
console.log('Is valid with original:', isValidOriginal);

// Generate a fresh hash to verify
const freshHash = bcrypt.hashSync(password, 10);
console.log('\nFresh hash:', freshHash);
const isValidFresh = bcrypt.compareSync(password, freshHash);
console.log('Is valid with fresh hash:', isValidFresh);
