const express = require('express');
const { createPost, getPosts } = require('../controllers/posts');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', getPosts);

module.exports = router; 