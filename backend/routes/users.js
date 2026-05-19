const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
const {
  getUsers,
  getUser,
  updateUserRole,
  deleteUser,
  getSavedDestinations,
} = require('../controllers/userController');

router.get('/', protect, adminOnly, getUsers);
router.get('/saved', protect, getSavedDestinations);
router.get('/:id', protect, adminOnly, getUser);
router.put('/:id/role', protect, adminOnly, updateUserRole);
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
