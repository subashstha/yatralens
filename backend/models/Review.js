const mongoose = require('mongoose');
const Destination = require('./Destination');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, maxlength: 100 },
  comment: { type: String, required: true, maxlength: 1000 },
  photos: [String],
  visitedOn: Date,
  helpful: { type: Number, default: 0 },
  helpfulBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

reviewSchema.index({ destination: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcAverageRating = async function (destinationId) {
  const stats = await this.aggregate([
    { $match: { destination: destinationId } },
    { $group: { _id: '$destination', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  if (stats.length > 0) {
    await Destination.findByIdAndUpdate(destinationId, {
      averageRating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].count,
    });
  } else {
    await Destination.findByIdAndUpdate(destinationId, { averageRating: 0, reviewCount: 0 });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.destination);
});

reviewSchema.post('remove', function () {
  this.constructor.calcAverageRating(this.destination);
});

module.exports = mongoose.model('Review', reviewSchema);
