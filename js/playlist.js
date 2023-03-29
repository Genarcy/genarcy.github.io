const playlist = document.getElementById('playlist');
const audio = document.getElementById('audio');
let currentSongIndex = 0;
let isPlaying = false;

// Create an array of song objects
const songs = [
  {
    title: 'Song 1',
    artist: 'Artist 1',
    src: 'music/song1.mp3'
  },
  {
    title: 'Song 2',
    artist: 'Artist 2',
    src: 'music/song2.mp3'
  },
  {
    title: 'Song 3',
    artist: 'Artist 3',
    src: 'music/song3.mp3'
  }
];

// Play the current song
function playSong() {
  isPlaying = true;
  const song = songs[currentSongIndex];
  audio.src = song.src;
  audio.play();
}

// Play the next song in the playlist
function playNextSong() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  playSong();
}

// Add click event listener to each song in the playlist
for (let i = 0; i < playlist.children.length; i++) {
  const songElement = playlist.children[i];
  songElement.addEventListener('click', () => {
    currentSongIndex = i;
    playSong();
  });
}

// Play the next song when the current song ends
audio.addEventListener('ended', () => {
  playNextSong();
});

// Start playing the first song in the playlist
playSong();
