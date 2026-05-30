let songs = [
    {
        title: "Lost in the City Lights",
        author: "Cosmo Sheldrake",
        src: "lost-in-city-lights-145038.mp3",
        img: "cover-1.jpg",
    },
    {
        title: "Forest Lullaby",
        author: "Lesfm",
        src: "forest-lullaby-110624.mp3",
        img: "cover-2.jpg",
    },
];


let currentSongIndex = 0;

let audio =  document.querySelector(".audio");
let previous = document.getElementById("previousButton");
let play = document.getElementById("playButton");
let next = document.getElementById("nextButton");

let songTitle = document.querySelector(".song-title")
let artistName = document.querySelector(".artist-name");
let songImg = document.querySelector(".music-img img");
let progress = document.querySelector(".music-progress");
let current = document.querySelector(".current-time");
let duration = document.querySelector(".duration");
let musicTime = document.querySelector(".music-time");


musicTime.addEventListener("click", (e) => {

    let width = musicTime.clientWidth;

    let clickPosition = e.offsetX;

    let duration = audio.duration;

    audio.currentTime =
    (clickPosition / width) * duration;

});

function  formatTime(time){
    let minutes = Math.floor(time / 60);
    let secondes = Math.floor(time % 60);

    if(secondes < 10) {
        secondes = "0" + secondes
    }

    return `${minutes}:${secondes}`;
}

function loadSong(index) {
    songTitle.textContent = songs[index].title;
    artistName.textContent = songs[index].author;
    songImg.src = `image/${songs[index].img}`
    audio.src = `music/${songs[index].src}`
}


next.addEventListener("click", () => {
    currentSongIndex++;
    if(currentSongIndex >= songs.length) {
        currentSongIndex = 0; 
    }
    loadSong(currentSongIndex);
    audio.play()
})


play.addEventListener("click", () =>  {
    if(audio.paused) {
        audio.play();
    }else{
        audio.pause();
    }
})

previous.addEventListener("click", () => {
    currentSongIndex--;

    if(currentSongIndex < songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);
    audio.play();
})

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
})

audio.addEventListener("timeupdate", () => {
    let progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    current.textContent = formatTime(audio.currentTime);
})

audio.addEventListener("ended", () => {
    next.click();
})

loadSong(currentSongIndex)


