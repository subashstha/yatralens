const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  addComment,
} = require('../controllers/blogController');

router.get('/', getBlogs);
router.get('/:slug', getBlog);
router.post('/', protect, adminOnly, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);
router.put('/:id/like', protect, likeBlog);
router.post('/:id/comments', protect, addComment);

module.exports = router;
