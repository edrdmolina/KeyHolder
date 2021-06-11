const express = require('express');
const router = express.Router();
const {
  catchAsync, isLoggedIn,
} = require('../middleware/index');

const {
  getLanding,
  getKeyManager, postKey, putKey, deleteKey,
} = require('../controller/index');

// GET home page : /
router.get('/', getLanding);

// GET Key Manager: /key-manager
router.get('/key-manager',isLoggedIn, catchAsync(getKeyManager));

// POST key: /key-manager
router.post('/key-manager',isLoggedIn, catchAsync(postKey));

// PUT key: /:id
router.put('/:id', putKey);

// DELETE key: /:id
router.delete('/:id', isLoggedIn, catchAsync(deleteKey));

module.exports = router;
