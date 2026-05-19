const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, unique: true },
  description: { type: String, maxlength: 300 },
  icon: { type: String, default: '🏔️' },
  image: { type: String, default: '' },
  color: { type: String, default: '#DC143C' },
  gradient: { type: String, default: 'from-red-500 to-red-700' },
  destinationCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

categorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);
