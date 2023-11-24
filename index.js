import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = (
  await fetchCharacters("https://rickandmortyapi.com/api/character")
).info.pages;

let page = 1;

cardRepeater(1);

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
  }
  cardRepeater(page);
});
prevButton.addEventListener("click", () => {
  if (1 < page) {
    page--;
  }
  cardRepeater(page);
});

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchQuery = searchBar.elements[`query`].value;
  const url = `https://rickandmortyapi.com/api/character?name=${searchQuery}`; //// this doesn't work when somebody searches something that doesn't exist
  const data = await fetchCharacters(url);
  const resultsFromData = data.results;

  cardContainer.innerHTML = "";

  resultsFromData.forEach((item) => cardContainer.append(CharacterCard(item)));

  pagination.textContent = `1 / 1`;
});

/////     FUNCTIONS     /////
async function cardRepeater(pageIndex) {
  const url = `https://rickandmortyapi.com/api/character?page=${pageIndex}`;
  const data = await fetchCharacters(url);
  // const resultsFromData = data.results; /* Destructure results from data */
  const { results } = data;

  cardContainer.innerHTML = "";

  results.forEach((item) => cardContainer.append(CharacterCard(item)));

  pagination.textContent = `${pageIndex} / ${maxPage}`;
}

async function fetchCharacters(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
