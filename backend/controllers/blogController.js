const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9;
    const skip = (page - 1) * limit;

    const filter = { isPublished: true };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) filter.$text = { $search: req.query.search };

    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .populate('author', 'name avatar')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit)
      .select('-content -comments');

    res.json({ success: true, total, totalPages: Math.ceil(total / limit), currentPage: page, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true })
      .populate('author', 'name avatar bio')
      .populate('comments.user', 'name avatar');
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    blog.views += 1;
    await blog.save({ validateBeforeSave: false });
    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user._id });
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, blog: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    const liked = blog.likes.some(id => id.toString() === req.user._id.toString());
    if (liked) {
      blog.likes = blog.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      blog.likes.push(req.user._id);
    }
    await blog.save({ validateBeforeSave: false });
    res.json({ success: true, likes: blog.likes.length, liked: !liked });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    if (!req.body.comment) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }
    blog.comments.push({ user: req.user._id, comment: req.body.comment });
    await blog.save({ validateBeforeSave: false });
    await blog.populate('comments.user', 'name avatar');
    res.json({ success: true, comments: blog.comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
