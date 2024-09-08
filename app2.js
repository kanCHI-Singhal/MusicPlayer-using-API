document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    searchSongs(query);
});

async function searchSongs(query) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results
    
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
            `;
            resultsContainer.appendChild(songElement);
        });
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}
