const { Post, User } = require('../models');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Judul dan konten wajib diisi.' });
    }
    const post = await Post.create({
      title,
      content,
      userId: req.user.id
    });
    res.status(201).json({ message: 'Postingan berhasil dibuat', post });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }]
    });
    if (!post) {
      return res.status(404).json({ message: 'Postingan tidak ditemukan.' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Postingan tidak ditemukan.' });
    }
    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: 'Anda tidak berhak mengubah postingan ini.' });
    }
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Judul dan konten wajib diisi.' });
    }
    post.title = title;
    post.content = content;
    await post.save();
    res.json({ message: 'Postingan berhasil diupdate', post });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Postingan tidak ditemukan.' });
    }
    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: 'Anda tidak berhak menghapus postingan ini.' });
    }
    await post.destroy();
    res.json({ message: 'Postingan berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
}; 