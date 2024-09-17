// Carregar API de países
const loadCountryAPI = () => {
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
        allCountries = data;
        displayCountries(allCountries);
    });
};

let allCountries = [];

// Exibir países
const displayCountries = countries => {
    const container = document.getElementById('countries');
    const countriesHTML = countries.map(country => getCountryHTML(country)).join(' ');
    container.innerHTML = countriesHTML;
};

// Gerar HTML de um país
const getCountryHTML = country => {
    return `
        <div class="country-div" onclick="viewCountryDetails('${country.name.common}')">
            <img src="${country.flags.png}">
            <h2>${country.name.common}</h2>
            <hr>
            <h4>População: ${country.population.toLocaleString()}</h4>
            <h4>Região: ${country.region}</h4>
            <h4>Capital: ${country.capital}</h4>
        </div>
    `;
};

// Função de busca por nome
const searchCountry = () => {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredCountries = allCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchValue)
    );
    displayCountries(filteredCountries);
};

// Filtrar por Região
const filterByRegion = () => {
    const regionValue = document.getElementById('region-filter').value;
    const filteredCountries = allCountries.filter(country => 
        country.region === regionValue || regionValue === ''
    );
    displayCountries(filteredCountries);
};

// Filtrar por População
const filterByPopulation = () => {
    const populationValue = document.getElementById('population-filter').value;
    const filteredCountries = allCountries.filter(country => {
        const population = country.population;
        if (populationValue === '1M') return population < 1000000;
        if (populationValue === '1M-10M') return population >= 1000000 && population < 10000000;
        if (populationValue === '10M-100M') return population >= 10000000 && population < 100000000;
        if (populationValue === '100M') return population >= 100000000;
        return true;
    });
    displayCountries(filteredCountries);
};

// Ordenar países
const sortCountries = () => {
    const sortBy = document.getElementById('sort-by').value;
    const sortedCountries = [...allCountries];

    if (sortBy === 'name') {
        sortedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortBy === 'population') {
        sortedCountries.sort((a, b) => a.population - b.population);
    } else if (sortBy === 'area') {
        sortedCountries.sort((a, b) => a.area - b.area);
    }
    
    displayCountries(sortedCountries);
};


const viewCountryDetails = countryName => {
    if (countryName === 'Brazil') {
        window.location.href = '../index/brazil.html';  // Redireciona para a página específica do Brasil
    } else {
        window.location.href = `detalhes.html?country=${countryName}`;  // Redireciona para a página genérica de detalhes de país
    }
};

// Inicializar ao carregar a página
loadCountryAPI();
