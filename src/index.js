import './css/styles.css';

const refs = {
  countryInfo: document.querySelector('.country-info'),
  input: document.querySelector('#search-box'),
};
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', handelSeachCountryInput);

function handelSeachCountryInput(evt) {
  const searchCountry = evt.target.value;
  fetchCountries(searchCountry).then(renderCountryCard);
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages
    `
  ).then(response => {
    return response.json();
  });
}

function createCountryCard(country) {
  return country
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<div class="country-wrapper">
          <img class="country-flag" src="${flags.svg}" alt="${
          flags.alt
        }" width='40' height='30'/>
        <h1 class="country-title">${name.official}</h1></div>
        <ul class="country-list">
        <li class="country-item">
        <p class="country-property">Capital:</p>
         <span class="country-property-value">${capital}</span></li>
      <li class="country-item">
      <p class="country-property">Population:</p>
       <span class="country-property-value">${population}</span> </li>
      <li class="country-item">
      <p class="country-property">Language:</p> 
      <span class="country-property-value">${Object.values(
        languages
      )}</span> </li></ul>`
    )
    .join('');
}

function renderCountryCard(countryName) {
  refs.countryInfo.innerHTML = createCountryCard(countryName);
  console.log(refs.countryInfo);
}
