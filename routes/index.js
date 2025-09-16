const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const postsRoutes = require('./posts');

// TODO: Import dan gunakan rute lain di sini

router.get('/', (req, res) => {
  res.json({ message: 'API Blog Root' });
});

router.use(authRoutes);
router.use('/posts', postsRoutes);

module.exports = router; 