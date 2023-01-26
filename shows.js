import { getShows, getDeets, getSeason } from "./api.js";

const showDiv = document.getElementById("show-div");
const rightDiv = document.getElementById("right-div");
const userFaves = document.getElementById("user-faves");
const userInput = document.querySelector("input");

function toggleDisplay(t) {
  if (t.style.display === "none") {
    t.style.display = "block";
    return;
  } else {
    t.style.display = "none";
    return;
  }
}

function addToFaves(episode) {
  userFaves.innerHTML += "<li>" + episode.name + "</li>";
}

async function renderEpisodes(season, div, seasonTitle) {
  let epDisplay = document.createElement("div");
  epDisplay.style.display = "none";

  div.appendChild(epDisplay);
  for (let i = 0; i < season.episodes.length; i++) {
    let episodeTitle = document.createElement("p");
    let episode = season.episodes[i];
    episodeTitle.innerHTML =
      "<b>" + episode.episode_number + ". " + episode.name + "</b>";
    epDisplay.appendChild(episodeTitle);
    let overview = document.createElement("p");
    overview.innerHTML = "<small>" + episode.overview + "</small>";
    episodeTitle.appendChild(overview);
    let addToFavesBtn = document.createElement("button");
    addToFavesBtn.textContent = "add to favorites";
    overview.appendChild(addToFavesBtn);

    addToFavesBtn.addEventListener("click", addToFaves.bind(null, episode));

    //  div.innerHTML += season.episodes[i].name + "<br />";
  }
  seasonTitle.addEventListener("click", toggleDisplay.bind(null, epDisplay));
}

async function renderSeasons(id, title, seasons) {
  function backToSearch() {
    rightDiv.classList.remove("open-seasons");
  }
  rightDiv.innerHTML = "<h3>" + title + "</h3>";
  rightDiv.classList.add("open-seasons");
  const backButton = document.createElement("button");
  backButton.textContent = "back to search";
  backButton.addEventListener("click", backToSearch);
  rightDiv.appendChild(backButton);

  for (let i = 1; i <= seasons; i++) {
    const season = await getSeason(id, i);
    let seasonDiv = document.createElement("div");
    rightDiv.appendChild(seasonDiv);
    let seasonTitle = document.createElement("h4");
    seasonTitle.classList.add("season-title");
    seasonTitle.textContent = season.name;
    seasonDiv.appendChild(seasonTitle);
    renderEpisodes(season, seasonDiv, seasonTitle);

    //rightDiv.innerHTML += "<p>" + season.name + "</p>";
  }
}

export async function renderShows() {
  const shows = await getShows();
  showDiv.innerHTML = "";
  userInput.value = "";

  for (let i = 0; i < shows.results.length; i++) {
    async function displayDeets() {
      const blob = await getDeets(shows.results[i].id);

      renderSeasons(blob.id, blob.name, blob.number_of_seasons);
    }

    let newP = document.createElement("p");
    showDiv.appendChild(newP);
    newP.textContent = shows.results[i].name;
    newP.classList.add("results-show");
    newP.addEventListener("click", displayDeets);
  }
  /* showDiv.innerHTML = shows.results
    .map((show) => {
      return `<p>${show.name}</p>`;
    })
    .join("");*/
}

export function testing() {
  console.log("testing");
}
