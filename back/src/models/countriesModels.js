const axios = require('axios');

const countryBaseApiUrl = 'https://date.nager.at/api/v3/AvailableCountries';
const populationApiUrl = 'https://countriesnow.space/api/v0.1/countries/population';
const flagApiUrl = 'https://countriesnow.space/api/v0.1/countries/flag/images';
const borderApiUrl = 'https://date.nager.at/api/v3/CountryInfo/';

//PEGAR TODOS OS PAISES
const fetchAllCountries = async () => {
    try {
        const response = await axios.get(countryBaseApiUrl);
        const countriesData = response.data;

        const countryNames = countriesData.map(country => country.name);

        return countryNames;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
};

const fetchCountryData = async (country) => {
    try {
        // Pega a população para o país específico
        const populationResponse = await axios.get(populationApiUrl);
        const populations = populationResponse.data.data;
        
        const populationData = populations.find(pop => pop.country.toLowerCase() === country.toLowerCase());

        // Pega a população mais recente (última data)
        let latestPopulation = 'Desconhecida';
        if (populationData) {
            const sortedPopulation = populationData.populationCounts.sort((a, b) => new Date(b.date) - new Date(a.date));
            latestPopulation = sortedPopulation.length > 0 ? sortedPopulation[0].value : 'Desconhecida';
        }

        // Pega a bandeira para o país específico
        const flagResponse = await axios.get(flagApiUrl);
        const flags = flagResponse.data.data;
        const flagData = flags.find(flag => flag.name.toLowerCase() === country.toLowerCase());
        const flag = flagData ? flagData.flag : 'Sem imagem';

        return {
            name: country,
            population: latestPopulation,
            flag: flag,
        };

    } catch (error) {
        console.error(`Erro ao buscar dados do país ${country}:`, error);
        throw new Error(`Erro ao buscar dados do país ${country}`);
    }
};



module.exports = { fetchAllCountries, fetchCountryData };
