const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
const {
  getDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
  getFeaturedDestinations,
  getTrendingDestinations,
  getNearby,
} = require('../controllers/destinationController');

// Nested reviews route
router.use('/:destinationId/reviews', require('./reviews'));

router.get('/featured', getFeaturedDestinations);
router.get('/trending', getTrendingDestinations);
router.get('/nearby', getNearby);
router.get('/', getDestinations);
router.get('/:id', getDestination);
router.post('/', protect, adminOnly, createDestination);
router.put('/:id', protect, adminOnly, updateDestination);
router.delete('/:id', protect, adminOnly, deleteDestination);

module.exports = router;
