const express = require('express');
const router = express.Router();
const { getAllCountries, getCountryInfo } = require('./controllers/countriesController');

// Rota para pegar todos os países
router.get('/', getAllCountries);

// Rota para pegar os detalhes de um país
router.get('/:country', getCountryInfo);

module.exports = router;
