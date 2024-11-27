const { fetchAllCountries, fetchCountryData, fetchCountriesWithRegions } = require('../models/countriesModels');

// GET /COUNTRIES/
const getAllCountries = async (req, res) => {
    try {
        const countries = await fetchCountriesWithRegions();
        res.json(countries);
    } catch (error) {
        console.error('Erro ao buscar os países no controller:', error);
        res.status(500).json({ message: 'Erro ao buscar os países', error: error.message });
    }
};

// /GET /COUNTRIES/:COUNTRY
const getCountryInfo = async (req, res) => {
    const { country } = req.params;
    try {
        const countryData = await fetchCountryData(country)
        res.json(countryData);

    } catch (error) {
        console.error('Erro ao buscar informações do país:', error);
        res.status(500).json({ message: 'Erro ao buscar as informações do país', error: error.message });
    }
};

module.exports = { getAllCountries, getCountryInfo };  
