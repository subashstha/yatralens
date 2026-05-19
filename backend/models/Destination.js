const mongoose = require('mongoose');
const slugify = require('slugify');

const destinationSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 100 },
  slug: { type: String, unique: true },
  shortDescription: { type: String, required: true, maxlength: 250 },
  description: { type: String, required: true },
  category: [{
    type: String,
    enum: ['Trekking', 'Hiking', 'Cafe', 'Hidden Gem', 'Adventure', 'Religious', 'Short Ride', 'Weekend Trip', 'Cultural', 'Nature', 'Photography'],
    required: true,
  }],
  region: {
    type: String,
    enum: ['Koshi', 'Madhesh', 'Bagmati', 'Gandaki', 'Lumbini', 'Karnali', 'Sudurpashchim'],
    required: true,
  },
  district: { type: String, required: true },
  address: { type: String },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [85.3240, 27.7172] }, // [lng, lat] default Kathmandu
  },
  images: [{ type: String }],
  coverImage: { type: String, default: '' },
  budget: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    currency: { type: String, default: 'NPR' },
    includes: [String],
  },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard', 'Extreme'], default: 'Easy' },
  duration: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 1 },
    unit: { type: String, enum: ['Hours', 'Days', 'Weeks'], default: 'Days' },
  },
  altitude: { type: Number, default: 0 },
  activities: [String],
  bestSeason: [{ type: String, enum: ['Spring', 'Summer', 'Autumn', 'Winter', 'All Year'] }],
  tips: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    distance: String,
    accommodation: String,
  }],
  nearbyPlaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  tags: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  weatherInfo: { type: String },
  roadCondition: { type: String },
  permits: [String],
}, { timestamps: true });

destinationSchema.index({ location: '2dsphere' });
destinationSchema.index({ title: 'text', description: 'text', tags: 'text' });

destinationSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Destination', destinationSchema);
