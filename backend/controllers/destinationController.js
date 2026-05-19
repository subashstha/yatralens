const Destination = require('../models/Destination');

exports.getDestinations = async (req, res) => {
  try {
    let query = Destination.find({ isPublished: true });

    // Text search
    if (req.query.search) {
      query = Destination.find({ $text: { $search: req.query.search }, isPublished: true });
    }

    // Category filter
    if (req.query.category) query = query.where('category').in(req.query.category.split(','));
    // Region filter
    if (req.query.region) query = query.where('region', req.query.region);
    // Difficulty filter
    if (req.query.difficulty) query = query.where('difficulty', req.query.difficulty);
    // Budget filter — show destinations whose price range overlaps the user's budget
    if (req.query.minBudget) query = query.where('budget.max').gte(Number(req.query.minBudget));
    if (req.query.maxBudget) query = query.where('budget.min').lte(Number(req.query.maxBudget));
    // Duration filter
    if (req.query.duration) query = query.where('duration.max').lte(Number(req.query.duration));

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * limit;

    const total = await Destination.countDocuments(query.getFilter());

    // Sort
    const sortBy = req.query.sort || '-createdAt';
    query = query.sort(sortBy).skip(skip).limit(limit).select('-itinerary -tips');

    const destinations = await query;

    res.json({
      success: true,
      count: destinations.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      destinations,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDestination = async (req, res) => {
  try {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);
    const filter = isObjectId
      ? { $or: [{ slug: req.params.id }, { _id: req.params.id }], isPublished: true }
      : { slug: req.params.id, isPublished: true };

    const destination = await Destination.findOne(filter)
      .populate('nearbyPlaces', 'title coverImage slug category')
      .populate('createdBy', 'name avatar');

    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });

    // Increment views
    destination.views += 1;
    await destination.save({ validateBeforeSave: false });

    res.json({ success: true, destination });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getFeaturedDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({ isFeatured: true, isPublished: true })
      .limit(8)
      .select('title slug coverImage region category averageRating reviewCount difficulty budget shortDescription');
    res.json({ success: true, destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getTrendingDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({ isTrending: true, isPublished: true })
      .limit(8)
      .select('title slug coverImage region category averageRating views difficulty budget shortDescription');
    res.json({ success: true, destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createDestination = async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const destination = await Destination.create(req.body);
    res.status(201).json({ success: true, destination });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, destination });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, message: 'Destination deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getNearby = async (req, res) => {
  try {
    const { lng, lat, distance = 50 } = req.query;
    if (!lng || !lat) {
      return res.status(400).json({ success: false, message: 'lng and lat query parameters are required' });
    }
    const destinations = await Destination.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: distance * 1000,
        },
      },
      isPublished: true,
    })
      .limit(10)
      .select('title slug coverImage category location');
    res.json({ success: true, destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
