const express = require('express');
const router = express.Router();

router.get('/posts', (req, res) => {
  const posts = [
    { id: 1, content: 'Sample post', createdAt: new Date(), author: { id: 1, username: 'user1', name: 'User One' } }
  ];
  res.json(posts);  
});

module.exports = router;