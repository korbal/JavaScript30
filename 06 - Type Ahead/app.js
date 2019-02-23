const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // so we can use the variable in the search. global, insensitive
    const regex = new RegExp(wordToMatch, "gi");

    //  search in cities and states too
    return place.city.match(regex) || place.state.match(regex);
  });
}
// puts commas into population in UI
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  // this is what is typed into the search box
  // console.log(this.value);
  const matchArray = findMatches(this.value, cities);
  console.log(matchArray);
  const html = matchArray
    .map(place => {
      // this highlights the word. swaps city's class to highlighted class
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class= "population">${numberWithCommas(place.population)}</span>
    </li>
    `;
    })
    .join(""); // instead of array, it's a string, so no coma in UI
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
