const User = require('../models/User');
const Destination = require('../models/Destination');
const Review = require('../models/Review');
const Blog = require('../models/Blog');

exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalDestinations, totalReviews, totalBlogs] = await Promise.all([
      User.countDocuments(),
      Destination.countDocuments(),
      Review.countDocuments(),
      Blog.countDocuments(),
    ]);

    const recentUsers = await User.find()
      .select('name email avatar createdAt')
      .sort('-createdAt')
      .limit(5);

    const topDestinations = await Destination.find()
      .select('title views averageRating reviewCount')
      .sort('-views')
      .limit(5);

    const recentReviews = await Review.find()
      .populate('user', 'name')
      .populate('destination', 'title')
      .sort('-createdAt')
      .limit(5);

    // Monthly user registration stats (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const monthlyStats = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Destination stats by region
    const regionStats = await Destination.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$region', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Rating distribution
    const ratingDistribution = await Review.aggregate([
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      stats: { totalUsers, totalDestinations, totalReviews, totalBlogs },
      recentUsers,
      topDestinations,
      recentReviews,
      monthlyStats,
      regionStats,
      ratingDistribution,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
