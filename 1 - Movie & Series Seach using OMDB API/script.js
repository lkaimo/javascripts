const apiKey = 'c68e830';

// Add an event listener to the h1 element
document.getElementById('kflixerHeading').addEventListener('click', function() {
    goHome();
});

/*
// Add this function to handle the "go home" action
function goHome() {
    // Reset the content to the initial state (e.g., "try searching a movie or series")
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<p id="placeholder-text" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">Try searching a movie or series</p>';
}
*/

// Add this function to handle the "go home" action
function goHome() {
    // Reset the content to display an image and text
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
        <div id="home">
        <img style="height: 540px; width: auto;" src="img/home.png">
        <h2 id="placeholder-text"><strong>Try searching a movie or series</strong></h2>
        </div>
    `;
}

function handleKeyPress(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
        fetchMovieDetails();
    }
}

async function fetchMovieDetails() {
    const apiKey = 'c68e830'; // Replace with your OMDb API key
    const movieTitleInput = document.getElementById('movieTitle');
    const movieTitle = encodeURIComponent(movieTitleInput.value);

    try {
        // Make a request to OMDb API
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`);
        const data = await response.json();

        // Check if the response contains multiple results
        if (data.Response === 'True' && Array.isArray(data.Search) && data.Search.length > 0) {
            // Display a list of search results
            displaySearchResults(data.Search);
        } else {
            // If no multiple results, proceed with displaying movie details
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = await formatMovieDetails(data);
        }
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
    }
}

function displaySearchResults(searchResults) {
    const outputDiv = document.getElementById('output');

    // Add a bigger and bold text saying "Search Result:"
    outputDiv.innerHTML = '<h2 style="text-align: center;" class="search-result-text">Search Result:</h2>';

    // Create a container for search result items
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('search-results-container');

    searchResults.forEach(result => {
        // Create a container for each search result
        const resultContainer = document.createElement('div');
        resultContainer.classList.add('search-result-container');

        // Create an image element for the poster
        const posterImg = document.createElement('img');
        posterImg.src = result.Poster !== 'N/A' ? result.Poster : 'img/noposter.png';
        posterImg.alt = `${result.Title} Poster`;
        
        // Attach a click event to the poster image to fetch details for the selected result
        posterImg.addEventListener('click', async () => {
            const selectedTitle = result.Title;
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(selectedTitle)}`);
            const selectedData = await response.json();
            outputDiv.innerHTML = await formatMovieDetails(selectedData);
        });

        // Create a title element for the centered title
        const titleElem = document.createElement('p');
        titleElem.textContent = result.Title;
        titleElem.classList.add('centered-title');
        
        // Attach a click event to the title text to fetch details for the selected result
        titleElem.addEventListener('click', async () => {
            const selectedTitle = result.Title;
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(selectedTitle)}`);
            const selectedData = await response.json();
            outputDiv.innerHTML = await formatMovieDetails(selectedData);
        });

        // Append the poster, title, to the result container
        resultContainer.appendChild(posterImg);
        resultContainer.appendChild(titleElem);
        resultsContainer.appendChild(resultContainer);
    });

    // Append the results container to the output div
    outputDiv.appendChild(resultsContainer);
}

// Function to get the current mode class
function getModeClass() {
    const body = document.body;
    return body.classList.contains('dark-mode') ? 'dark-text' : 'light-text';
}


async function formatMovieDetails(data) {
    if (data && data.Title) {
        // Fetch the trailer information
        const trailer = await fetchMovieTrailer(data.Title, data.Year);

        // Construct the HTML with the fetched trailer and additional text
        const trailerHtml = `
            <div class="trailer-container">
                <h3>Trailer:</h3>
                <iframe width="560" height="315" src="${trailer}" frameborder="0" allowfullscreen></iframe>
            </div>
            <p class="disclaimer-text">Not all trailers can be accurate. For example, some can be just fan-made, especially on upcoming titles.</p>
        `;

        // Construct the HTML with movie details and trailer
        const movieDetailsHtml = `
        <section class="movie-section">
        <div class="movie-poster">
        <img class="poster-img" src="${data.Poster !== 'N/A' ? data.Poster : 'img/noposter.png'}" alt="${data.Title} Poster">
        </div>
        <div class="movie-details">
            <h2>${data.Title} (${data.Year})</h2>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Director:</strong> ${data.Director !== undefined && data.Director !== 'N/A' ? data.Director : '(Database has not updated this yet)'}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>Runtime:</strong> ${data.Runtime !== undefined && data.Runtime !== 'N/A' ? data.Runtime : '(Database has not updated this yet)'}</p>
            <p><strong>Released:</strong> ${data.Released}</p>
            <p><strong>Language:</strong> ${data.Language}</p>
            <p><strong>Country:</strong> ${data.Country}</p>
            <p><strong>Awards:</strong> ${data.Awards}</p>
            <p><strong>Box Office:</strong> ${data.BoxOffice ?? 'N/A'}</p>
            <p><strong><span class="imdb-logo">IMDb</span> Rating:</strong> ${data.imdbRating}</p>
        </div>
    </section>

    <!-- Add your movie trailers section here -->
    <div class="trailer-container">
 
    </div>
        `;

        // Combine both HTML blocks
        const combinedHtml = movieDetailsHtml + trailerHtml;

        return combinedHtml;
    } else {
        // Display the not found modal
        notFoundModal("Movie/Series not found. Make sure the spelling is correct and make it more specific since there are many movies that have the same title.");
        return ""; // Return an empty string to prevent displaying undefined
    }
}

async function fetchMovieTrailer(title, year) {
    const apiKey = 'AIzaSyD0H4D2zM3QfR0qGiia6s_ZdnaLPF0TunA'; // Replace with your YouTube API key

    try {
        // Make a request to the YouTube API to search for the trailer
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${title} ${year} trailer&type=video&part=snippet&key=${apiKey}`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            return `https://www.youtube.com/embed/${videoId}`;
        }

        return ''; // Return an empty string if no trailer is found
    } catch (error) {
        // Handle errors
        console.error('Error fetching trailer:', error);
        return ''; // Return an empty string on error
    }
}

// Add an event listener to close the modal when the close button is clicked
document.querySelector('.close').addEventListener('click', closeModal);

// Add a function to show the not found modal
function notFoundModal(message) {
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modalMessage');
    
    modalMessage.textContent = message;
    modal.style.display = 'block';

    // Prevent scrolling when the modal is open
    document.body.style.overflow = 'hidden';
}

function closeNotFoundModal() {
    closeModal();

}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';

    // Allow scrolling when the modal is closed
    document.body.style.overflow = 'auto';
    goHome();
}


// Toggle between light and dark mode
function toggleMode() {
    const body = document.body;
    const modeToggleButton = document.querySelector('.mode-toggle-button');
    const links = document.querySelectorAll('.search-results-list a');

    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');

    // Toggle the sun/moon icon
    if (body.classList.contains('dark-mode')) {
        modeToggleButton.innerHTML = '<i class="far fa-moon"></i>';
    } else {
        modeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Add the clicked class for the animation effect
    modeToggleButton.classList.add('clicked');

    // Remove the clicked class after the animation duration
    setTimeout(() => {
        modeToggleButton.classList.remove('clicked');
    }, 300);

    // Update text color for search result links
    links.forEach(link => {
        link.classList.remove('light-text', 'dark-text');
        link.classList.add(getModeClass());
    });
}
