export default class RestCountriesApi {
  #BASE_URL = 'https://restcountries.com/v3.1/name/';
  name = '';

  fetchCountries() {
    const filterParams = '?fields=name,capital,population,flags,languages';

    return fetch(`${this.#BASE_URL}${this.name}${filterParams}`).then(
      response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      }
    );
  }
}
