
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');


const music = document.querySelector('audio');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeEL = document.getElementById('current-time');
const durationEL = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',

    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
    },
    {
        name: 'NainowaleNe',
        displayName: 'Nainowale Ne',
        artist: 'Neetu Mohan',
    },
    {
        name: 'chaleya',
        displayName: 'Chaleya',
        artist: 'Arjit Sing, Shilpa Rao',
    },
    {
        name: 'chaliyatasan',
        displayName: 'Chaliya Chaliya',
        artist: 'Sunidhi Chauhan',
    },
    {
        name: 'gulimata',
        displayName: 'Guli Mata',
        artist: 'Shreya Ghoshal',
    },
    {
        name: 'kudmayi',
        displayName: 'Kudmayi',
        artist: 'Shahid Mallya',
    },
    {
        name: 'kyalogetum',
        displayName: 'Kya Loge Tum',
        artist: 'B Praak',
    },
    {
        name: 'meregharram',
        displayName: 'Mere Ghar Ram ',
        artist: 'Jubin Nautial',
    },
    {
        name: 'ramsiya',
        displayName: 'Ram Siya Ram',
        artist: 'Sachet Tandon, Parampara Tandon',
    },
    {
        name: 'jiyare',
        displayName: 'Jiya Re',
        artist: 'Neeti Mohan',
    },
    {
        name: 'mohmohkedhage',
        displayName: 'Moh Moh ke Dhage',
        artist: 'Monali Thakur',
    },
    {
        name: 'patakhaguddi',
        displayName: 'Patakha Guddi',
        artist: 'Sultan Nooran, Jyoti Nooran',
    },
    {
        name: 'uditereaankhoinse',
        displayName: 'Udi',
        artist: 'Shail Hada, Sunidhi Chauhan',
    },
];


// Check if Playing
let isPlaying = false;


// Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();

    
}

//  Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listner
playBtn.addEventListener('click', () => (isPlaying? pauseSong() : playSong()));


// Update DOM
 function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;

 }

//  Current Song
let songIndex = 0;

// pre Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();

}

// Next Song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){ 
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();

}


//  On Load - Select Fist Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e){
    if (isPlaying){
      const { duration, currentTime } = e.srcElement
    //   Update Prgress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;


    
    // Caldulate display for duration
    const durationMinutes = Math.floor(duration / 60);
   // console.log('minutes', durationMinutes);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
   // console.log('seconds', durationSeconds);
    
    // delay switch duration Element to avoid NaN
    if (durationSeconds){
        durationEL.textContent = `${durationMinutes}:${durationSeconds}`;
     }




    // Caldulate display for current
       const currentMinutes = Math.floor(currentTime / 60);
      // console.log('minutes', currentMinutes);
       let currentSeconds = Math.floor(currentTime % 60);
       if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
        }
       // console.log('seconds', currentSeconds);
        currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;

    }
}

// Set Progress Bar
function setProgressBar(e){
   // console.log(e);
    const width = this.clientWidth;
   // console.log('width', width);
    const clickX = e.offsetX;
    //console.log('clickX', clickX);
    const {duration } = music;
   // console.log(clickX / width); 
   // console.log((clickX / width) * duration); 
    music.currentTime = (clickX / width) * duration;

}

//  Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);