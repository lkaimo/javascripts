document.addEventListener('DOMContentLoaded', function () {
    getAllPokemon();

    // Add event listener for the Pokedex image
    const pokedexImage = document.querySelector('.dancing-pokedex');
    pokedexImage.addEventListener('click', searchPokemon);
});


function getAllPokemon() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1017';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(pokemon => {
                fetchPokemonDetails(pokemon.url);
            });
        })
        .catch(error => {
            console.error('Error fetching Pokémon list:', error);
            alert('Error fetching Pokémon list. Please try again.');
        });
}

function fetchPokemonDetails(url) {
    fetch(url)
        .then(response => response.json())
        .then(pokemonData => {
            displayPokemonInfo(pokemonData);
        })
        .catch(error => {
            console.error('Error fetching Pokémon data:', error);
        });
}

function displayPokemonInfo(pokemonData) {
    const resultElement = document.getElementById('result');
    const capitalizedPokemonName = capitalizeFirstLetter(pokemonData.name);

    const imgSrc = pokemonData.sprites.front_default || 'img/default.png'; // Replace with the path to your default image

    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.innerHTML = `<h2>${capitalizedPokemonName}</h2>
                             <img src="${imgSrc}" alt="${capitalizedPokemonName}">`;                                              
    // Add click event listener to open modal
    pokemonCard.onclick = function () {
        openModal(pokemonData);
    };

    resultElement.appendChild(pokemonCard);
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function openModal(pokemonData) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    const typeImages = {
        bug: 'Bug.png',
        dark: 'Dark.png',
        dragon: 'Dragon.png',
        electric: 'Electric.png',
        fairy: 'Fairy.png',
        fighting: 'Fighting.png',
        fire: 'Fire.png',
        flying: 'Flying.png',
        ghost: 'Ghost.png',
        grass: 'Grass.png',
        ground: 'Ground.png',
        ice: 'Ice.png',
        normal: 'Normal.png',
        poison: 'Poison.png',
        psychic: 'Psychic.png',
        rock: 'Rock.png',
        steel: 'Steel.png',
        water: 'Water.png',
        // Add more types as needed
    };

    const typeImagesHTML = pokemonData.types.map(type => {
        const typeName = type.type.name;
        const imageUrl = typeImages[typeName.toLowerCase()] || ''; // Default to an empty string if no image is specified
        return `<img src="types/${imageUrl}" alt="${typeName}" class="type-image" style="width: 70px; height: 25px;">`;
    }).join(' ');

    const abilitiesHTML = pokemonData.abilities.map(ability => {
        return `<li>${capitalizeFirstLetter(ability.ability.name)}</li>`;
    }).join('');

    // Display the details inside the modal
    const capitalizedPokemonName = capitalizeFirstLetter(pokemonData.name);
    const imgSrc = pokemonData.sprites.front_default || 'img/default.png';

    modalContent.innerHTML = `<h2>${capitalizedPokemonName}</h2>
                             <div style="text-align: center;">
                                    <img src="${imgSrc}" alt="${capitalizedPokemonName}" style="width: 150px; height: 150px; margin: 0 auto;">
                             </div>
                             <p>ID: ${pokemonData.id}</p>
                             <p>Height: ${pokemonData.height} decimetres</p>
                             <p>Weight: ${pokemonData.weight} hectograms</p>
                             <p>Types:</p>
                             <p>${typeImagesHTML}</p>
                             <p>Abilities: <ul>${abilitiesHTML}</ul></p>
                             <p>Stats: <br> ${pokemonData.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</p>`;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function searchPokemon() {
    // You can customize the search functionality here, for now, let's prompt the user for input
    const pokemonName = prompt('Enter the Pokemon name or ID:').toLowerCase();
    
    if (pokemonName) {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokemon not found');
                }
                return response.json();
            })
            .then(pokemonData => {
                openModal(pokemonData);
            })
            .catch(error => {
                console.error('Error searching for Pokémon:', error);
                alert('Pokemon not found. Please try again.');
            });
    }
}