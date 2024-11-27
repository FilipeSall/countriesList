const axios = require('axios');

const countryBaseApiUrl = 'https://date.nager.at/api/v3/AvailableCountries';
const populationApiUrl = 'https://countriesnow.space/api/v0.1/countries/population';
const flagApiUrl = 'https://countriesnow.space/api/v0.1/countries/flag/images';
const borderApiUrl = 'https://date.nager.at/api/v3/CountryInfo/';

// PEGAR A REGIÃO DE UM PAIS
const fetchCountryRegion = async (countryCode) => {
    try {
        const response = await axios.get(`${borderApiUrl}${countryCode}`);
        const countryInfo = response.data;

        return countryInfo.region || 'Região desconhecida';
    } catch (error) {
        console.error(`Erro ao buscar região para o código ${countryCode}:`, error);
        return 'Erro ao buscar região';
    }
};

//PEGAR TODOS OS PAISES
const fetchAllCountries = async () => {
    try {
        const response = await axios.get(countryBaseApiUrl);
        const countriesData = response.data;

        return countriesData;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
};

// COMBINAR OS PAISES COM AS REGIOES (CONTINENTES)
const fetchCountriesWithRegions = async () => {
    try {
        const countries = await fetchAllCountries();

        // Fazendo as requisições de região em paralelo
        const countriesWithRegions = await Promise.all(
            countries.map(async (country) => {
                const region = await fetchCountryRegion(country.countryCode);
                return {
                    name: country.name,
                    region: region,
                };
            })
        );

        return countriesWithRegions;
    } catch (error) {
        console.error('Error to mix the countries with regions:', error);
        return [];
    }
};

// PEGAR POPULAÇÃO DO PAÍS
const fetchCountryPop = async (country) => {
    try {
        const populationResponse = await axios.get(populationApiUrl);
        const populations = populationResponse.data.data;

        // Filtra os países cujo nome contenha o termo buscado
        const populationMatches = populations.filter(pop =>
            pop.country.toLowerCase().includes(country.toLowerCase())
        );

        // Seleciona o primeiro país encontrado ou retorna um valor padrão
        const populationData = populationMatches.length > 0 ? populationMatches[0] : null;

        // Pega a população mais recente (última data)
        let latestPopulation = 'unavailable';
        if (populationData) {
            const sortedPopulation = populationData.populationCounts.sort((a, b) => new Date(b.date) - new Date(a.date));
            latestPopulation = sortedPopulation.length > 0 ? sortedPopulation[0].value : 'unavailable';
        }
        return latestPopulation;
    } catch (error) {
        console.error(`Erro ao buscar população do país ${country}:`, error);
        return 'Desconhecida';
    }
};

// PEGAR A BANDDEIRA DO PAIS
const fetchCountryFlag = async (country) => {
    try {
        // Faz a requisição para a API de bandeiras
        const flagResponse = await axios.get(flagApiUrl);
        const flags = flagResponse.data.data;

        // Procura diretamente pela bandeira do país usando o nome
        const flagData = flags.find(flag =>
            flag.name.toLowerCase() === country.toLowerCase()
        );

        // Retorna a URL da bandeira ou um valor padrão
        return flagData ? flagData.flag : 'No flag available';
    } catch (error) {
        console.error(`Erro ao buscar bandeira para o país ${country}:`, error);
        throw new Error(`Erro ao buscar bandeira para o país ${country}`);
    }
};


// PEGAR OS PAISES QUE FAZEM FRONTEIRA
const fetchCountryBorders = async (countryCode) => {
    try {
        // Faz a requisição para a API das fronteiras
        const bordersResponse = await axios.get(borderApiUrl); 

        // Encontrar o país específico pelo código do país
        const countryData = bordersResponse.data.find(country => country.countryCode === countryCode);

        if (!countryData) {
            throw new Error(`País com código ${countryCode} não encontrado.`);
        }

        // Retorna as fronteiras dos países
        const countryBorders = countryData.borders.map(border => ({
            commonName: border.commonName,
            officialName: border.officialName,
            countryCode: border.countryCode,
        }));

        return { borders: countryBorders };

    } catch (error) {
        console.error(`Erro ao buscar dados de fronteiras para o país ${countryCode}:`, error);
        throw new Error(`Erro ao buscar dados de fronteiras para o país ${countryCode}`);
    }
};


// PEGAR DADOS DO PAÍS
const fetchCountryData = async (country) => {
    try {
        // Inicia as requisições em paralelo
        const [countryPop, flag] = await Promise.all([
            fetchCountryPop(country),
            fetchCountryFlag(country)
        ]);

        return {
            name: country,
            population: countryPop,
            flag: flag,
        };
    } catch (error) {
        console.error(`Erro ao buscar dados do país ${country}:`, error);
        throw new Error(`Erro ao buscar dados do país ${country}`);
    }
};

module.exports = { fetchAllCountries, fetchCountryData, fetchCountriesWithRegions };
