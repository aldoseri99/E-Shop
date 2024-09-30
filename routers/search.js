const express = require('express');

const router = express.Router();

const searchCntrl = require('../controllers/search')

router.get("/index", searchCntrl.search_index_get)

module.exports = router