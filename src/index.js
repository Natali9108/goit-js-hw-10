import './css/styles.css';
import RestCountriesApi from './fetchCountries';
import createCountryCards from './templates/country.hbs';
import createMinCountryCards from './templates/country-min-info.hbs';
import lodashDebounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
  countryInfo: document.querySelector('.country-info'),
  input: document.querySelector('#search-box'),
};
const DEBOUNCE_DELAY = 300;
const restCountriesApi = new RestCountriesApi();

refs.input.addEventListener(
  'input',
  lodashDebounce(handelSeachCountryInput, DEBOUNCE_DELAY)
);

function handelSeachCountryInput(evt) {
  restCountriesApi.name = evt.target.value.trim();

  if (restCountriesApi.name === '') {
    return (refs.countryInfo.textContent = '');
  }
  return restCountriesApi
    .fetchCountries()
    .then(renderCountryCard)
    .catch(errorMessage);
}

function renderCountryCard(countryName) {
  if (countryName.length >= 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countryName.length < 10 && countryName.length >= 2) {
    return (refs.countryInfo.innerHTML = createMinCountryCards(countryName));
  }
  return (refs.countryInfo.innerHTML = createCountryCards(countryName));
}

function errorMessage() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
