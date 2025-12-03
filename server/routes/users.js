// routes/users.js - usando controllers
const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  postaUser
} = require('../controllers/userController');

// ==========================
//        CREATE USER
// ==========================
router.post('/', createUser);

// ==========================
//        CREATE USER ALTERNATIVE
// ==========================
router.post('/create', postaUser);

// ==========================
//        LIST USERS
// ==========================
router.get('/', getAllUsers);

// ==========================
//     GET USER BY ID
// ==========================
router.get('/:id', getUser);

// ==========================
//     GET USER BY EMAIL
// ==========================
router.get('/email/:email', async (req, res) => {
  const { email } = req.params;

  // Esta rota específica faz uma consulta direta ao Supabase
  // pois não temos um controller específico para email
  const { supabase } = require('../config/supabaseClient');

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// ==========================
//        UPDATE USER
// ==========================
router.put('/update/:id', updateUser);

// ==========================
//        DELETE USER
// ==========================
router.delete('/:id', deleteUser);

module.exports = router;