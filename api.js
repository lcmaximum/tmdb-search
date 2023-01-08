import { config } from "./config.js";

const BASE_URL = config.api_base_url;
const API_KEY = config.api_key;
export async function getShows(page = 1) {
  console.log("wut");
  const userQuery = document.querySelector("input").value;
  console.log(userQuery);
  const response = await fetch(
    `${BASE_URL}search/tv?api_key=${API_KEY}&page=${page}&query=${userQuery}&language=en-US`
  );
  console.log(response);
  return response.json();
}

export async function getDeets(id) {
  const response = await fetch(
    `${BASE_URL}tv/${id}?api_key=${API_KEY}&language=en-US`
  );
  console.log("deets response: ", response);
  return response.json();
}

export async function getSeason(id, season) {
  const response = await fetch(
    `${BASE_URL}tv/${id}/season/${season}?api_key=${API_KEY}&language=en-US`
  );
  console.log("season response: ", response);
  return response.json();
}
