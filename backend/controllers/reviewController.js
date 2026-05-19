const Review = require('../models/Review');
const Destination = require('../models/Destination');

exports.getReviews = async (req, res) => {
  try {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.destinationId);
    let destinationId = req.params.destinationId;
    if (!isObjectId) {
      const dest = await Destination.findOne({ slug: req.params.destinationId }).select('_id');
      if (!dest) return res.status(404).json({ success: false, message: 'Destination not found' });
      destinationId = dest._id;
    }
    const reviews = await Review.find({ destination: destinationId })
      .populate('user', 'name avatar')
      .sort('-createdAt');
    res.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.destinationId);
    const destination = isObjectId
      ? await Destination.findById(req.params.destinationId)
      : await Destination.findOne({ slug: req.params.destinationId });
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });

    const existing = await Review.findOne({ user: req.user._id, destination: destination._id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this destination' });
    }

    const review = await Review.create({
      ...req.body,
      user: req.user._id,
      destination: destination._id,
    });
    await review.populate('user', 'name avatar');
    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('user', 'name avatar');
    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await review.deleteOne();
    await Review.calcAverageRating(review.destination);
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.markHelpful = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    const alreadyMarked = review.helpfulBy.some(id => id.toString() === req.user._id.toString());
    if (alreadyMarked) {
      review.helpfulBy = review.helpfulBy.filter(id => id.toString() !== req.user._id.toString());
      review.helpful -= 1;
    } else {
      review.helpfulBy.push(req.user._id);
      review.helpful += 1;
    }
    await review.save({ validateBeforeSave: false });
    res.json({ success: true, helpful: review.helpful });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
