import { config } from "./config.js";

const BASE_URL = config.api_base_url;
const API_KEY = config.api_key;
/*
export async function getPopularMovies(page = 1) {
  console.log("get popular movies");
  let data = [];
  try {
    const response = await fetch(
      `${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`
    );
    const responseData = await response.json();
    console.log("response data ", responseData);
    data = responseData?.results;
    console.log(data);
  } catch (error) {}
  return data;
}
*/

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
  console.log(response);
  return response.json();
}

//https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
