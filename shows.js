import { getShows, getDeets, getSeason } from "./api.js";

const showDiv = document.getElementById("show-div");
const rightDiv = document.getElementById("right-div");

async function renderEpisodes(season, div) {
  console.log("season episodes: ", season.episodes);
  for (let i = 0; i < season.episodes.length; i++) {
    div.innerHTML += season.episodes[i].name + "<br />";
  }
}

async function renderSeasons(id, title, seasons) {
  rightDiv.innerHTML = "<h3>" + title + "</h3>";
  for (let i = 1; i <= seasons; i++) {
    const season = await getSeason(id, i);
    let seasonDiv = document.createElement("div");
    rightDiv.appendChild(seasonDiv);
    seasonDiv.innerHTML = "<h4>" + season.name + "</h4>";
    seasonDiv.addEventListener(
      "click",
      renderEpisodes.bind(null, season, seasonDiv)
    );
    //rightDiv.innerHTML += "<p>" + season.name + "</p>";
    console.log("season: ", season);
  }
}

export async function renderShows() {
  const shows = await getShows();
  console.log("got shows: ", shows.results);
  for (let i = 0; i < shows.results.length; i++) {
    async function displayDeets() {
      const blob = await getDeets(shows.results[i].id);
      console.log("Deets");
      console.log("blob: ", blob);
      renderSeasons(blob.id, blob.name, blob.number_of_seasons);
    }
    let newP = document.createElement("p");
    showDiv.appendChild(newP);
    newP.textContent = shows.results[i].name;
    newP.addEventListener("click", displayDeets);
  }
