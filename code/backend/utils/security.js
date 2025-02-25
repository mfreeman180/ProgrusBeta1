const crypto = require('crypto');
const bcrypt = require('bcrypt');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '32-char-long-secret-key-1234567890';
const IV_LENGTH = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

function generateRecoveryKey() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = { encrypt, hashPassword, generateRecoveryKey };