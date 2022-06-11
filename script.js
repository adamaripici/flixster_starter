const API_KEY = '2fad85c72f247d315cf82d65a2791042';
const pageSize = 9;
let page = 1;
var prefixURL = 'https://image.tmdb.org/t/p/w500';
let searchInput = "";
let offset = 9;
let limit = 0;
let values = "";
/**
 * QUERY SELECTORS VARIABLES GO HERE
 */
let movieForm = document.querySelector("form");
let movieArea = document.querySelector("#movies-grid");
let movieTitle = document.querySelector("#title");
let moviePoster = document.querySelector("#poster");
let movieVotes = document.querySelector("#votes");
let input = document.querySelector("#search-input");
let showMoreBtn = document.querySelector("#show-more");
let flixsterBtn = document.querySelector("#flixster");

// event listener for search
movieForm.addEventListener('submit',searchMovie);
showMoreBtn.addEventListener('click',showMore);
flixsterBtn.addEventListener('click',homePage);

function homePage() {
    console.log("refreshing.")
    movieArea.innerHTML=``;
    getMovies();
}

async function showMore(evt) {
    if (searchInput === "false") {
        // console.log("showing more")
        page += 1;
        let URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}&language=eng` 
        let response1 = await fetch(URL);
        let responseData2 = await response1.json();
        // console.log(page);
        // console.log(responseData2);
        displayResults(responseData2)
    } else {
        // console.log("showing more")
        page += 1;
        let URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${values}&page=${page}` 
        let response1 = await fetch(URL);
        let responseData2 = await response1.json();
        // console.log(page);
        // console.log(responseData2);
        displayResults(responseData2)
    }
    // searchMovie(evt);
}

async function getMovies() {
    let apiUrl =  "https://api.themoviedb.org/3/movie/now_playing?api_key=2fad85c72f247d315cf82d65a2791042&language=eng";
    let response = await fetch(apiUrl);
    let responseData = await response.json();
    // console.log("response data: ", responseData);
    displayResults(responseData);
}

async function searchMovie(evt) {
    searchInput = "true";
    values = input.value;
    // console.log(values);
    document.getElementById("playing").style.display = "none";
    evt.preventDefault();
    
    // searchInput = evt.target[0].value.toLowerCase;
    // console.log(evt.target[0].value);
    let URL = "https://api.themoviedb.org/3/search/movie?api_key=2fad85c72f247d315cf82d65a2791042&language=en-US&page=${page}&include_adult=false&query=" + values; 
    let searchResponse = await fetch(URL);
    let searchResponseData = await searchResponse.json();
    console.log("response data: ", searchResponseData);
    movieArea.innerHTML=``;
    displayResults(searchResponseData);
    // input.value=  '';
}

function displayResults(responseData) {

    responseData.results.forEach((element) => {
        let movieImage = prefixURL + element.poster_path;
        movieArea.innerHTML += `
        <div id="movie-card" >
            <img src="${movieImage}" id="poster">
            <p id = "votes">⭐ ${element.vote_average}</p>
            <h3 id="title">${element.title}</h3>
        </div>
        `;
    });
}
    

// occurs when an object has been loaded
window.onload = function() {
    searchInput = "false";
    getMovies();
}