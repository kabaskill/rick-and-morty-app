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
const searchBarInput = document.querySelector(`[data-js="search-bar-input"]`);

// States
const maxPage = 42;
//we will get the data.info.pages some time to CHANGE THIS hardcoded thing

let page = 1;
const searchQuery = "";

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

/////     FUNCTIONS     /////
async function cardRepeater(pageIndex) {
  const url = `https://rickandmortyapi.com/api/character?page=${pageIndex}`;
  const data = await fetchCharacters(url);
  const resultsFromData = data.results;

  cardContainer.innerHTML = "";

  resultsFromData.forEach((item) => cardContainer.append(CharacterCard(item)));

  pagination.textContent = `${pageIndex} / ${maxPage}`;
}

async function fetchCharacters(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(searchBarInput.value);
  const url = `https://rickandmortyapi.com/api/character?&name=${searchBarInput.value}`;
  const data = await fetchCharacters(url);
  const resultsFromData = data.results;

  cardContainer.innerHTML = "";

  resultsFromData.forEach((item) => cardContainer.append(CharacterCard(item)));

  pagination.textContent = `1 / 1`;
});
