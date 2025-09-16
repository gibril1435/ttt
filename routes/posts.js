const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const auth = require('../middleware/auth');

// GET /api/posts - publik
router.get('/', postsController.getAllPosts);

// POST /api/posts - proteksi
router.post('/', auth, postsController.createPost);

// GET /api/posts/:id - publik
router.get('/:id', postsController.getPostById);

// PUT /api/posts/:id - proteksi
router.put('/:id', auth, postsController.updatePost);

// DELETE /api/posts/:id - proteksi
router.delete('/:id', auth, postsController.deletePost);

module.exports = router; 