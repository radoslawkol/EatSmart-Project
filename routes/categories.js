const express = require('express');

const router = express.Router();

router.get('/breakfast', (req, res) => {
  res.send('Śniadania Page');
});
router.get('/lunch', (req, res) => {
  res.send('Obiady Page');
});

module.exports = router;
