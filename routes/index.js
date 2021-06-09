const express = require('express');
const router = express.Router();

const {
  getLanding,
  getKeyManager, postKey, putKey, deleteKey,
} = require('../controller/index');

// GET home page : /
router.get('/', getLanding);

// GET Key Manager: /key-manager
router.get('/key-manager', getKeyManager);

// POST key: /key-manager
router.post('/key-manager', postKey);

// PUT key: /:id
router.put('/:id', putKey);

// DELETE key: /:id
router.delete('/:id', deleteKey);

module.exports = router;
