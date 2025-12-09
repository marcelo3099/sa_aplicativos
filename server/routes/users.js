// routes/users.js - usando controllers
const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersByType
} = require('../controllers/userController');

// ==========================
//        CREATE USER
// ==========================
router.post('/', createUser);

// ==========================
//        LIST USERS
// ==========================
router.get('/', getAllUsers);

// ==========================
//     GET USER BY ID
// ==========================
router.get('/:id', getUser);

// ==========================
//     GET USER BY TYPE
// ==========================
router.get('/type/:user_type', getUsersByType);

// ==========================
//        UPDATE USER
// ==========================
router.put('/update/:id', updateUser);

// ==========================
//        DELETE USER
// ==========================
router.delete('/:id', deleteUser);

module.exports = router;