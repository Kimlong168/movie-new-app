const array_search = window.location.search.split("=");
const movie_id = array_search[1];

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '846edab228msh6d91b8927f93c75p143fb9jsna3abe7637abf',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

  let movie = {
    fetchMovie: function (movie_id) {
        fetch(`https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=${movie_id}&currentCountry=US`, options)
        .then(response => response.json())
        .then(data => this.getMovie(data))
        .catch(err => console.error(err));
    },
    getMovie: function (data) {
        console.log(data);
        document.querySelector(".movie-title").innerHTML = data.title.title;
        document.querySelector("#detail-img").src = data.title.image.url;
        document.body.style.backgroundImage =`url('${data.title.image.url}')`;
        document.querySelector('.movie-text').innerHTML = data.plotOutline.text;
        document.querySelector('.movie-year').innerHTML ="Release data: " + data.releaseDate;
        document.querySelector('.movie-rating').innerHTML="Rating: "+ data.ratings.rating;
        document.querySelector('.movie-genre').innerHTML="Genre: "+ data.genres[0];
        document.querySelector('.movie-author').innerHTML="Author: "+data.plotSummary.author;
        document.querySelector('.movie-plot').innerHTML= data.plotSummary.text;
        document.querySelector('#poster-link').href=data.title.image.url;
        document.querySelector('.spinner').style.display = "none";
       const loading =  document.querySelectorAll('.loading');
       loading.forEach((item) => {
           item.style.display = "block";
       });

    },
  };
  movie.fetchMovie(movie_id);


  

  