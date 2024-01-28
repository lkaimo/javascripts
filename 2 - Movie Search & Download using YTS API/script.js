// Get the YTS logo element
const ytsLogo = document.getElementById('ytsLogo');

// Add an event listener to the YTS logo to reset the view when clicked
ytsLogo.addEventListener('click', resetView);

const detailsContainer = document.getElementById('movieDetails');
const suggestionsContainer = document.getElementById('movieDetails');
// Updated URL of the movie details API with additional parameters
const movieDetailsBaseUrl = 'https://yts.mx/api/v2/movie_details.json?movie_id=15&with_images=true&with_cast=true';
// URL of the movie suggestions API
const movieSuggestionsBaseUrl = 'https://yts.mx/api/v2/movie_suggestions.json?movie_id=15';

// Function to reset the view to the initial state
function resetView() {
    // Clear the search input
    document.getElementById('searchInput').value = '';

    // Show the search results container
    document.getElementById('home').classList.add('visible');

    // Hide the movie details and suggestions containers
    document.getElementById('movieDetails').classList.remove('visible');
    document.getElementById('movieSuggestions').classList.remove('visible');
    document.getElementById('searchResults').classList.remove('visible');

    // Reset the background styles
    document.body.style.background = 'rgb(36, 36, 36)';
    document.body.style.backgroundSize = 'initial';
    document.body.style.backgroundPosition = 'initial';
    document.body.style.backdropFilter = 'none';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {

        const movieDetailsContainer = document.getElementById('movieDetails');
        const movieSuggestionsContainer = document.getElementById('movieSuggestions');
        const homeContainer = document.getElementById('home');
        const body = document.body;

        // Hide movie details when searching again
        movieDetailsContainer.classList.remove('visible');
        movieSuggestionsContainer.classList.remove('visible');
        homeContainer.classList.remove('visible');

        // Change the background to a specific color and remove the background image
        body.style.background = 'rgb(36, 36, 36)';
        body.style.backgroundSize = 'initial';
        body.style.backgroundPosition = 'initial';

        searchMovies();
    }
}

// Add an event listener for the popstate event (when the user navigates back or forward in the history)
window.addEventListener('popstate', function (event) {
    // Check if the state object is null (indicating a browser back button press)
    if (!event.state) {
        resetView();
    }
});

// Function to search for movies based on the query term
async function searchMovies() {
    const searchInput = document.getElementById('searchInput').value;
    const searchResultsContainer = document.getElementById('searchResults');

    // Make sure search results are visible
    searchResultsContainer.classList.add('visible');

    // Check if the search input is not empty
    if (searchInput.trim() !== '') {
        const apiUrl = `https://yts.mx/api/v2/list_movies.json?query_term=${encodeURIComponent(searchInput)}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Check if the request was successful and movies array is defined
            if (data.status === 'ok' && data.data.movies) {
                const movies = data.data.movies;

                // Display search results
                document.getElementById('searchResults').innerHTML = `
                        <h2 style="color: #4CAF50; text-align: center;">YTS Movies</h2>
                            <section>
                                ${movies.map(movie => `
                                    <div onclick="showMovieDetails('${movie.id}')">
                                        <img src="${movie.medium_cover_image}" alt="${movie.title}" width="100">
                                        ${movie.title} (${movie.year})
                                    </div>`).join('')}
                            </section>
                        `;
            } else {
                // Display an error message if the request was not successful or movies array is undefined
                document.getElementById('searchResults').innerHTML = '<p>No results found.</p>';
            }
        } catch (error) {
            // Display an error message if an exception occurs
            document.getElementById('searchResults').innerHTML = '<p>An error occurred while fetching search results</p>';
            console.error('Error fetching search results:', error);
        }
    } else {
        // Display a message if the search input is empty
        document.getElementById('searchResults').innerHTML = '<p>Please enter a movie title to search.</p>';
    }
}

// Function to display movie details when a movie is clicked
async function showMovieDetails(movieId) {
    const detailsUrl = `${movieDetailsBaseUrl}&movie_id=${movieId}`;
    const suggestionsUrl = `${movieSuggestionsBaseUrl}&movie_id=${movieId}`;

    const movieDetailsContainer = document.getElementById('movieDetails');
    const movieSuggestionsContainer = document.getElementById('movieSuggestions');

    // Hide movie details when searching again
    movieDetailsContainer.classList.add('visible');
    movieSuggestionsContainer.classList.add('visible');

    try {
        // Fetch movie details
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();
        const searchResultsContainer = document.getElementById('searchResults');

        // Hide search results
        searchResultsContainer.classList.remove('visible');

        // Fetch movie suggestions
        const suggestionsResponse = await fetch(suggestionsUrl);
        const suggestionsData = await suggestionsResponse.json();

        // Check if both requests were successful and movie details are available
        if (detailsData.status === 'ok' && detailsData.data.movie) {
            const movie = detailsData.data.movie;

            const backgroundImageUrl = movie.background_image;

            // Set the background image of the body
            document.body.style.backgroundImage = `url('${backgroundImageUrl}')`;
            document.body.style.backgroundSize = 'cover'; // Optional: Adjust the background size
            document.body.style.backgroundRepeat = 'no-repeat'; // Optional: Adjust the background repeat
            document.body.style.backgroundPosition = 'top'; // Optional: Adjust the background position
            document.body.style.backdropFilter = 'blur(10px)';

            // Display movie details
            const detailsContainer = document.getElementById('movieDetails');
            detailsContainer.innerHTML = `
  <div class="custom-section">
    <div class="movie-details-container">
      <div id="movie-poster">
        <img src="${movie.medium_cover_image}" alt="${movie.title}">
      </div>
      <div id="details">
        <h1>${movie.title}</h1>
        <h2>${movie.year}</h2>
        <h2>${movie.genres.join('/ ')}</h2>
        <h2>${movie.mpa_rating}</h2>
        <h2><span class="imdb-logo">IMDb</span> ${movie.rating}</h2>
        <h2>${movie.runtime} minutes</h2>
      </div>
    </div>

    <div class="cast-container">
  <h3>Main Cast:</h3>

</div>

    <div class="recommendation">
  <h3 style = "border-radius: 10px; background-color: rgba(0, 0, 0, 0.8); padding: 15px;">Similar Movies:</h3>
    ${suggestionsData.data.movies.map(suggestion => `
      <div class="recommendation-item" onclick="showMovieDetails('${suggestion.id}')">
        <img class="recommendation-image" src="${suggestion.medium_cover_image}" alt="${suggestion.title}">
      </div>`).join('')}
</div>

    <div class="plot-container">
      <h3>Download Link:</h3>  
      <button class="button" onclick="window.location.href='${movie.torrents[1].url}'">
  <a style="color: inherit; text-decoration: none;" class="button-content" target="_blank" rel="noopener noreferrer">Link 1</a>
</button>

<button class="button" onclick="window.location.href='${movie.torrents[0].url}'">
  <a style="color: inherit; text-decoration: none;" class="button-content" target="_blank" rel="noopener noreferrer">Link 2</a>
</button>


      <h3>Plot:</h3>
      <p style = "text-align: left;">${movie.description_full}</p>
      <div class="screenshots">
        <a href="${movie.large_screenshot_image1}" target="_blank" rel="noopener noreferrer">
        <img src="${movie.medium_screenshot_image1}" alt="Screenshot 1">
        </a>
        <a href="${movie.large_screenshot_image2}" target="_blank" rel="noopener noreferrer">
            <img src="${movie.medium_screenshot_image2}" alt="Screenshot 2">
        </a>
        <a href="${movie.large_screenshot_image3}" target="_blank" rel="noopener noreferrer">
            <img src="${movie.medium_screenshot_image3}" alt="Screenshot 3">
        </a>
      </div>
      </div>
  </div>
`;
            // Display movie cast
            const castContainer = document.querySelector('.cast-container');
            if (movie.cast && movie.cast.length > 0) {
                castContainer.innerHTML = `
        <h3>Main Cast:</h3>
        ${movie.cast.map(actor => `
            <div class="cast-item">
                <div class="cast-image-container">
                    <img src="${actor.url_small_image ? actor.url_small_image : 'img/noprofile.jpg'}" alt="${actor.name}" class="cast-image">
                </div>
                <div class="cast-name">${actor.name}</div>
            </div>`).join('')}
    </div>`;
            } else {
                castContainer.innerHTML = `
        <div class="cast-item">
            <h4>No Cast Data Available </h4>
        </div>
    </div>`;
            }

            // Fetch YouTube trailer
            const trailerUrl = await searchYouTubeTrailer(movie.title, movie.year);
            const plotContainer = document.querySelector('.plot-container');

            if (trailerUrl) {
                // Display YouTube trailer
                plotContainer.innerHTML += `
                    <div class="youtube-trailer">
                        <iframe width="560" height="315" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
            } else {
                // Display a message if the trailer is not found
                plotContainer.innerHTML += '<p>Trailer not found [Youtube API Queries per day limitation is reached].</p>';
            }


        } else {
            // Display an error message if the request was not successful or movie details are undefined
            detailsContainer.innerHTML = '<p>Error fetching movie details.</p>';
            suggestionsContainer.innerHTML = '';
        }
    } catch (error) {
        // Display an error message if an exception occurs 
        detailsContainer.innerHTML = '<p>An error occurred while fetching movie details</p>';
        suggestionsContainer.innerHTML = '';
        console.error('Error fetching movie details:', error);
    }
}

async function searchYouTubeTrailer(movieTitle, movieYear) {
    try {
        // Use the YouTube Data API to search for the movie trailer
        const apiKey = 'AIzaSyD0H4D2zM3QfR0qGiia6s_ZdnaLPF0TunA';
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(`${movieTitle} ${movieYear} official trailer`)}&type=video&key=${apiKey}`;

        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            return `https://www.youtube.com/embed/${videoId}`;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error searching YouTube trailer:', error);
        return null;
    }
}