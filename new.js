document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    searchSongs(query);
});

const favoriteSongs = [];
const playlists = {};

async function searchSongs(query) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 
    
    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song`);
        const data = await response.json();
        
        data.results.forEach(song => {
            const songElement = document.createElement('div');
            songElement.className = 'song';
            songElement.innerHTML = `
                <img src="${song.artworkUrl100}" alt="${song.collectionName}">
                <h3>${song.trackName}</h3>
                <p>Artist: ${song.artistName}</p>
                <p>Album: ${song.collectionName}</p>
                <audio controls>
                    <source src="${song.previewUrl}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <button onclick="addToFavorites('${encodeURIComponent(JSON.stringify(song))}')">Add to Favorites</button>
                <button onclick="addToPlaylistPrompt('${encodeURIComponent(JSON.stringify(song))}')">Add to Playlist</button>
            `;
            resultsContainer.appendChild(songElement);
        });
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

function addToFavorites(songData) {
    const song = JSON.parse(decodeURIComponent(songData));
    favoriteSongs.push(song);
    updateFavorites();
}

function updateFavorites() {
    const favoritesContainer = document.getElementById('favorites');
    favoritesContainer.innerHTML = ''; // Clear previous favorites
    
    favoriteSongs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.className = 'favorite';
        songElement.innerHTML = `
            <img src="${song.artworkUrl100}" alt="${song.collectionName}">
            <h3>${song.trackName}</h3>
            <p>Artist: ${song.artistName}</p>
            <p>Album: ${song.collectionName}</p>
            <audio controls>
                <source src="${song.previewUrl}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        favoritesContainer.appendChild(songElement);
    });
}

document.getElementById('create-playlist-button').addEventListener('click', function() {
    const playlistName = document.getElementById('playlist-name').value;
    if (playlistName && !playlists[playlistName]) {
        playlists[playlistName] = [];
        updatePlaylists();
    }
});

function addToPlaylistPrompt(songData) {
    const song = JSON.parse(decodeURIComponent(songData));
    const playlistName = prompt('Enter the name of the playlist to add this song to:');
    if (playlistName && playlists[playlistName]) {
        playlists[playlistName].push(song);
        updatePlaylists();
    }
}

function updatePlaylists() {
    const playlistsContainer = document.getElementById('playlists');
    playlistsContainer.innerHTML = ''; // Clear previous playlists
    
    for (const playlistName in playlists) {
        const playlistElement = document.createElement('div');
        playlistElement.className = 'playlist';
        playlistElement.innerHTML = `
            <h3>${playlistName}</h3>
            ${playlists[playlistName].map(song => `
                <div class="playlist-song">
                    <p>${song.trackName} by ${song.artistName}</p>
                </div>
            `).join('')}
        `;
        playlistsContainer.appendChild(playlistElement);
    }
}

// Placeholder favorite artists
const favoriteArtists = [
    { name: 'Artist 1', image: 'https://lastfm.freetls.fastly.net/i/u/avatar170s/61fb550bcac0135a0c88985191a28d05' },
    { name: 'Artist 2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTU5XIsss7pNVV_G1wlB7nV52w0ulMYTRPrA&s' },
    { name: 'Artist 3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEQcoge0N3C30Hv6F7XZxKFXh20IWtG2GClg&s' },
];

function updateFavoriteArtists() {
    const favoriteArtistsContainer = document.getElementById('favorite-artists');
    favoriteArtistsContainer.innerHTML = ''; // Clear previous artists
    
    favoriteArtists.forEach(artist => {
        const artistElement = document.createElement('div');
        artistElement.className = 'artist';
        artistElement.innerHTML = `
            <img src="${artist.image}" alt="${artist.name}">
            <h3>${artist.name}</h3>
        `;
        favoriteArtistsContainer.appendChild(artistElement);
    });
}

// Initialize favorite artists
updateFavoriteArtists();
