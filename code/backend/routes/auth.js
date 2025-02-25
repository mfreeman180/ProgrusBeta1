const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { encrypt, hashPassword, generateRecoveryKey } = require('../utils/security');
const { generateUsernameOptions } = require('../utils/username');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

router.get('/signup', (req, res) => {
  console.log('Signup route accessed');
  req.session.signupSessionId = crypto.randomBytes(16).toString('hex');
  // Mock third-party verification data
  const mockVerificationData = {
    accountNumber: '1234567890123456', // Mock 16-digit number
    pin: '123456', // Mock 6-digit PIN
    sex: 'unknown',
    race: 'unknown',
    ageRange: 'unknown',
    congressionalDistrict: 'unknown'
  };
  const encryptedAccountNumber = encrypt(mockVerificationData.accountNumber);
  req.session.verificationData = {
    encryptedAccountNumber,
    pin: mockVerificationData.pin,
    sex: mockVerificationData.sex,
    race: mockVerificationData.race,
    ageRange: mockVerificationData.ageRange,
    congressionalDistrict: mockVerificationData.congressionalDistrict
  };
  res.redirect(`http://localhost:3000/complete-signup?session_id=${req.session.signupSessionId}`);
});

router.post('/callback', (req, res) => {
  const { accountNumber, pin, sex, race, ageRange, congressionalDistrict, session_id } = req.body;
  if (session_id !== req.session.signupSessionId) {
    return res.status(400).json({ error: 'Invalid session' });
  }
  const encryptedAccountNumber = encrypt(accountNumber);
  req.session.verificationData = { encryptedAccountNumber, pin, sex, race, ageRange, congressionalDistrict };
  res.redirect('http://localhost:3000/complete-signup');
});

router.get('/signup-data', (req, res) => {
  if (!req.session.verificationData) {
    return res.status(400).json({ error: 'No verification data' });
  }
  const usernameOptions = generateUsernameOptions();
  res.json({ usernameOptions });
});

router.post('/finalize-signup', async (req, res) => {
  const { username, password, pin } = req.body;
  const { verificationData } = req.session;
  if (!verificationData || pin !== verificationData.pin) {
    return res.status(400).json({ error: 'Invalid session or PIN' });
  }
  const passwordHash = await hashPassword(password);
  const recoveryKey = generateRecoveryKey();
  await User.create({
    encrypted_account_number: verificationData.encryptedAccountNumber,
    username,
    password_hash: passwordHash,
    recovery_key: recoveryKey,
    age_range: verificationData.ageRange || 'unknown',
    sex: verificationData.sex || 'unknown',
    race: verificationData.race || 'unknown',
    congressional_district: verificationData.congressionalDistrict || 'unknown'
  });
  delete req.session.verificationData;
  res.json({ recoveryKey });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = 'dummy-token'; // Replace with JWT in production
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;