const Category = require('../models/Category');
const Destination = require('../models/Destination');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort('order');
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Destination.countDocuments({ category: { $in: [cat.name] }, isPublished: true });
        return { ...cat.toObject(), destinationCount: count };
      })
    );
    res.json({ success: true, categories: categoriesWithCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    const destinations = await Destination.find({ category: { $in: [category.name] }, isPublished: true })
      .select('title slug coverImage region difficulty averageRating reviewCount shortDescription budget')
      .sort('-averageRating');
    res.json({ success: true, category, destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
