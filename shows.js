import { getShows, getDeets } from "./api.js";

const showDiv = document.getElementById("show-div");
/* import { getPopularMovies } from "./api.js";
import { config } from "./config.js";

const moviesDiv = document.getElementById("movies");
export async function renderMovies() {
  console.log("render movies");
  const movies = await getPopularMovies();
  console.log("movies", movies);
  moviesDiv.innerHTML = movies
    .map((movie) => {
      return `<li class='col-4 col-lg-3 col-xl-2 p-1'>
      <a href='https://themoviedb.org/movie/${movie.id}'><img src='${config.image_base_url}${movie.poster_path}'></a> </li>`;
    })
    .join("");
}
*/

export async function renderShows() {
  const shows = await getShows();
  console.log("got shows: ", shows.results);
  /* showDiv.innerHTML = shows.results
    .map((show) => {
      return `<p>${show.name}</p>`;
    })
    .join("");
 */
  for (let i = 0; i < shows.results.length; i++) {
    const newP = document.createElement("p");
    showDiv.appendChild(newP);
    newP.textContent = shows.results[i].name;
    async function showDeets() {
      const tvDeets = await getDeets(shows.results[i].id);
      console.log(tvDeets.name, tvDeets.overview);
    }
    newP.addEventListener("click", showDeets);
  }
}

export function testing() {
  console.log("testing");
}
