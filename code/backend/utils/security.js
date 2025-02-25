const crypto = require('crypto');
const bcrypt = require('bcrypt');

// Create a proper 32-byte (256-bit) key for AES-256-CBC
function getEncryptionKey() {
  // Use environment variable if available
  if (process.env.ENCRYPTION_KEY) {
    // If the key is provided as a hex string
    if (/^[0-9a-f]{64}$/i.test(process.env.ENCRYPTION_KEY)) {
      return Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
    }
    // If provided as a 32-byte string, convert to buffer
    else if (Buffer.from(process.env.ENCRYPTION_KEY).length === 32) {
      return Buffer.from(process.env.ENCRYPTION_KEY);
    }
    // If the key is not correctly formatted, log a warning
    console.warn('ENCRYPTION_KEY environment variable is not properly formatted. Using fallback key.');
  }
  
  // Fallback to a derived key from the default string
  // Note: In production, always use environment variables instead of hardcoded values
  const defaultKey = '32-char-long-secret-key-1234567890';
  return crypto.createHash('sha256').update(String(defaultKey)).digest();
}

// Get the encryption key once at startup
const ENCRYPTION_KEY = getEncryptionKey();
const IV_LENGTH = 16;

function encrypt(text) {
  if (!text) return '';
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  
  let encrypted = cipher.update(String(text));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  if (!text) return '';
  
  const textParts = text.split(':');
  if (textParts.length !== 2) return '';
  
  const iv = Buffer.from(textParts[0], 'hex');
  const encryptedText = Buffer.from(textParts[1], 'hex');
  
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString();
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

function generateRecoveryKey() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = { encrypt, decrypt, hashPassword, generateRecoveryKey };