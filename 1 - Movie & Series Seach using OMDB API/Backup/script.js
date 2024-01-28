function handleKeyPress(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
        fetchMovieDetails();
    }
}

function fetchMovieDetails() {
    const apiKey = 'c68e830'; // Replace with your OMDb API key
    const movieTitleInput = document.getElementById('movieTitle');
    const movieTitle = encodeURIComponent(movieTitleInput.value);

    // Make a request to OMDb API
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`)
        .then(response => response.json())
        .then(data => {
            // Display the movie details
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = formatMovieDetails(data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
        });
}

function formatMovieDetails(data) {
    return `
        <div class="movie-details">
            <img src="${data.Poster}" alt="${data.Title} Poster">
            <h2>${data.Title} (${data.Year})</h2>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
        </div>
    `;
}

// Toggle between light and dark mode
function toggleMode() {
    const body = document.body;
    const modeToggleButton = document.querySelector('.mode-toggle-button');

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
}
