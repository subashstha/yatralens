const mongoose = require('mongoose');
const slugify = require('slugify');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true, maxlength: 500 },
}, { timestamps: true });

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 150 },
  slug: { type: String, unique: true },
  excerpt: { type: String, required: true, maxlength: 300 },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: {
    type: String,
    enum: ['Trek Guide', 'Budget Travel', 'Local Experience', 'Adventure', 'Culture', 'Food', 'Photography', 'Tips'],
    required: true,
  },
  tags: [String],
  featuredImage: { type: String, default: '' },
  images: [String],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  views: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  readTime: { type: Number, default: 5 },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
}, { timestamps: true });

blogSchema.index({ title: 'text', content: 'text', tags: 'text' });

blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Date.now();
  }
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
