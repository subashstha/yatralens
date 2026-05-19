const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.isActive) {
        return res.status(400).json({ success: false, message: 'Already subscribed' });
      }
      existing.isActive = true;
      await existing.save();
      return res.json({ success: true, message: 'Resubscribed successfully' });
    }
    await Newsletter.create({ email });
    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });
    await Newsletter.findOneAndDelete({ email });
    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
