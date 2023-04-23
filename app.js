
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '846edab228msh6d91b8927f93c75p143fb9jsna3abe7637abf',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};


let movies = {
  fetchMovies: function (movie) {
    fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${movie}`, options)
    .then(response => response.json())
    .then(data => this.getMovies(data))
    .catch(err => console.error(err));
  },

  getMovies: function (data) {
    const movies = data.d;
    console.log(movies);
    let output = "";
    movies.map((movie) => {
      if(movie.y === undefined) {
        movie.y = "Unknown";
      }
      output += `
            <div class="col col-sm-4 col-md-3">
            <a href="./detail.html?id=${movie.id}" target="_blank" class="text-decoration-none">
              <div class="card h-100 card-movie">
                <img
                  style="height: 320px"
                  src="${movie.i.imageUrl}"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-between gap-2">
                    <h5 class="card-title fw-bold text-danger">${movie.l}</h5>
                    <h6 class="year">${movie.y}</h6>
                  </div>
                </div>
              </div>
            </a>
            </div>
            `;

            document.querySelector("#movies-wrapper").innerHTML = output;
            document.querySelector(".spinner").style.display = "none";
    });
  },
};

movies.fetchMovies("spider");
document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?Movie)";

const searchBox = document.querySelector(".search-box");
const searchIcon = document.querySelector(".search-btn");

searchIcon.addEventListener("click", () => {
  movies.fetchMovies(searchBox.value);
});

searchBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    movies.fetchMovies(searchBox.value);
  }
});