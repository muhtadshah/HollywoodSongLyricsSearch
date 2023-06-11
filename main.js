document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", displaySongSuggestions);

    var searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", searchLyrics);
});

function displaySongSuggestions() {
    var searchInput = document.getElementById("searchInput");
    var songList = document.getElementById("songList");
    var songName = searchInput.value;

    // Clear the existing suggestions
    songList.innerHTML = "";

    // Make an API request to get the song suggestions based on the input
    // Replace 'YOUR_API_KEY' with your actual API key
    fetch("https://api.example.com/suggestions?query=" + encodeURIComponent(songName) + "&api_key=YOUR_API_KEY")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.error) {
                console.log("Error: " + data.error);
            } else {
                data.forEach(function(song) {
                    var option = document.createElement("option");
                    option.value = song;
                    songList.appendChild(option);
                });
            }
        })
        .catch(function(error) {
            console.log("An error occurred while fetching the song suggestions.");
            console.log(error);
        });
}

function searchLyrics() {
    var searchInput = document.getElementById("searchInput");
    var lyricsContainer = document.getElementById("lyricsContainer");
    var songName = searchInput.value;

    // Make an API request to get the lyrics based on the song name
    // Replace 'YOUR_API_KEY' with your actual API key
    fetch("https://api.example.com/lyrics?song=" + encodeURIComponent(songName) + "&api_key=YOUR_API_KEY")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.error) {
                lyricsContainer.innerText = "Error: " + data.error;
            } else {
                lyricsContainer.innerText = data.lyrics;
                addCopyButton();
            }
        })
        .catch(function(error) {
            lyricsContainer.innerText = "An error occurred while fetching the lyrics.";
            console.log(error);
        });
}

function addCopyButton() {
    var lyricsContainer = document.getElementById("lyricsContainer");
    var lyrics = lyricsContainer.innerText;

    // Create a button element
    var copyButton = document.createElement("button");
    copyButton.innerText = "Copy";
    copyButton.addEventListener("click", function() {
        copyToClipboard(lyrics);
        copyButton.innerText = "Copied!";
        copyButton.disabled = true;
    });

    lyricsContainer.appendChild(copyButton);
}

function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}