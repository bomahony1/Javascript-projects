const APIKey = "6ca489e4ba7ec67e021a22fdf0868549";
const APIUrlTrending = "https://api.themoviedb.org/3/trending/all/day?api_key=6ca489e4ba7ec67e021a22fdf0868549&page=1";
const APIUrlInfo = "https://api.themoviedb.org/3/movie/";
const APISearch = "https://api.themoviedb.org/3/search/movie?api_key=6ca489e4ba7ec67e021a22fdf0868549&query=";
const APIgenre = "https://api.themoviedb.org/3/discover/movie?api_key=6ca489e4ba7ec67e021a22fdf0868549&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres="
const imagePath = "https://image.tmdb.org/t/p/w500";

/* list of genre ID's */
const actionId = "28";
const thrillerId  = "53";
const comedyId  = "35";
const horrorId  = "27";
const romanceId  = "10749";

const logo = document.getElementById("logo");
const main = document.getElementById("default");
const searchContainer = document.getElementById("search-container");
const form = document.getElementById("form");
const search = document.getElementById("search");
const genreContainer = document.getElementById("genre-filter")

/* genre filters */
const action = document.getElementById("action");
const thriller = document.getElementById("thriller");
const comedy = document.getElementById("comedy");
const romance = document.getElementById("romance");

logo.addEventListener("click", () => {
    searchContainer.innerHTML = "";
    main.style.display = "block";
})


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovieSearch(APISearch + searchTerm);
    }
})

/* genre filters */
action.addEventListener("click", () => {
    action.classList.remove("highlight");
    thriller.classList.remove("highlight");
    comedy.classList.remove("highlight");
    romance.classList.remove("highlight");
    genreContainer.innerHTML = ""
    action.classList.add("highlight")
    getMovieGenre(APIgenre + actionId)
})

thriller.addEventListener("click", () => {
    action.classList.remove("highlight");
    thriller.classList.remove("highlight");
    comedy.classList.remove("highlight");
    romance.classList.remove("highlight");
    thriller.classList.add("highlight")
    genreContainer.innerHTML = ""
    getMovieGenre(APIgenre + thrillerId)
})

comedy.addEventListener("click", () => {
    action.classList.remove("highlight");
    thriller.classList.remove("highlight");
    comedy.classList.remove("highlight");
    romance.classList.remove("highlight");
    comedy.classList.add("highlight");
    genreContainer.innerHTML = "";
    getMovieGenre(APIgenre + comedyId)
})

romance.addEventListener("click", () => {
    action.classList.remove("highlight");
    thriller.classList.remove("highlight");
    comedy.classList.remove("highlight");
    romance.classList.remove("highlight");
    romance.classList.add("highlight");
    genreContainer.innerHTML = ""
    getMovieGenre(APIgenre + romanceId)
})



/* Get Movie Genres */
getMovieGenre(APIgenre + actionId)
async function getMovieGenre(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data)
    displayMovieGenre(data.results)
}

function displayMovieGenre(genre) {
    genre.forEach(movie=> {
        const film = document.createElement("div");
        film.classList.add("movies");
        film.innerHTML = `
        <img src="${imagePath + movie.backdrop_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>`
        document.getElementById("genre-filter").appendChild(film);
        
        const title = film.querySelector(".movies h3");

        title.addEventListener("click", () => {
            getMovieInfo(APIUrlInfo + movie.id + "?api_key=" + APIKey)
        });
    })
}



/* Gets all trending Movies */
getTrendingMovieData(APIUrlTrending);
async function getTrendingMovieData(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data.results);
    showTrendingMovies(data.results);
};

/* Get Movie From Seach */
async function getMovieSearch(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data.results);
    showMovieSearch(data.results);
}


/* Gets Movie Info */
async function getMovieInfo(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    displayMovieInfo(data);
};


/* Shows Trending Movies */
function showTrendingMovies(movies) {
    movies.forEach(movie => {
        trending = document.createElement("div");
        trending.classList.add('movie');
        const { id, original_title, original_name, release_date, first_air_date, vote_average,vote_count} = movie;
        trending.innerHTML = `
        <img src="${imagePath + movie.poster_path}" alt="${id}">
        <div class="movie-info">
            <p id="title">${!(original_title) ? original_name : original_title}</p>
            <div class="date-genre">
                <p>${!(release_date) ? first_air_date : release_date}<span>Thriller</span></p>
            </div>
            <div class="review">
                <i class="fa-solid fa-star" id="star"></i><p>${vote_average}<span>(${vote_count})</span></p>
            </div>
        </div> 
        `;
        const title = trending.querySelector("#title");

        title.addEventListener("click", () => {
            getMovieInfo(APIUrlInfo + id + "?api_key=" + APIKey)
        });

        document.getElementById("trending-movies").appendChild(trending);
        });
};


/* Shows movies from Search */
function showMovieSearch(movies) {
    main.style.display = "none";
    searchContainer.innerHTML = "";
    movies.forEach(movie => {
        const movieSearch = document.createElement("div");
        movieSearch.classList.add("search-result");
        movieSearch.innerHTML = `
        <img src="${imagePath + movie.poster_path}" alt="${movie.id}">
        <div class="movie-search-info">
            <p id="search-title">${!(movie.original_title) ? movie.original_name : movie.original_title}</p>
            <p id="rating">${movie.vote_average}</p>
        </div> 
        `

        const title = movieSearch.querySelector("#search-title");

        title.addEventListener("click", () => {
            getMovieInfo(APIUrlInfo + movie.id + "?api_key=" + APIKey)
        });
        const searchContainer = document.getElementById("search-container");
        searchContainer.appendChild(movieSearch);
    })
};

/* Pops up more info about the movie */
function displayMovieInfo(data) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <i id= "close" class="fa-solid fa-xmark"></i>
        <img src="${imagePath + data.poster_path}" alt="${data.id}">
        <h3>${data.title || data.name}</h3>
        <div class="movie-info">
            <p>Raiting: ${data.vote_average}<i class="fa-solid fa-star" id="star"></i><br>Release Date: ${data.release_date}<br>Duration: ${data.runtime} minutes</p>
        </div>
        <p id="description">${data.overview}</p>`

        const overlay = document.getElementById("overlay");
        overlay.classList.add("active")
    
    document.getElementById("popup-container").appendChild(popup);

    const close = document.getElementById("close");
    close.addEventListener("click", () => {
        removePopup();
    });

    function removePopup() {
        popup.remove();
        overlay.classList.remove("active");
    }
};







