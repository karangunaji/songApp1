document.addEventListener('DOMContentLoaded', function () {
    const tracksList = [
        {
            audioSrc: 'track/Sakhiyaan.mp3',
            coverSrc: 'images/sakhiyaan.jpg',
            name: 'Manindar Butter',
            desc: 'Wiz Khalifa - Amber Ice',
            id: 0,
        },
        {
            audioSrc: 'track/Deewana.mp3',
            coverSrc: 'images/deewana.jpg',
            name: 'Martin Garrix',
            desc: 'Ft. Tiesto Only Way Is Up',
            id: 1,
        },
        {
            audioSrc: 'track/Bol na mahi.mp3' ,
             coverSrc: 'images/mahi.jpg',
            name: 'Arijit singh',
            desc: 'Fresh Mood',
            id: 2,
        },
        {
            audioSrc: "track/Hue bechain.mp3",
            coverSrc: 'images/Hue_bechain.jpg',
            name: 'Yaseer Desai',
            desc: "Happy",
            id: 3,
        },
        {
            audioSrc: './tracks/Naino ki jo.mp3',
            coverSrc: 'images/Naino_ki.jpg',
            name: 'Altaf sayyad',
            desc: 'Ramen',
            id: 4,
        },
        {
            audioSrc:
                './tracks/Pop Smoke - For The Night (Audio) ft. Lil Baby, DaBaby.mp3',
            coverSrc: './images/popsmoke.jpg',
            name: 'Pop Smoke ft. Lil Baby, DaBaby',
            desc: 'For The Night',
            id: 5,
        },
    ];

    const currentTrackName = document.querySelector('header h3');
    const currentTrackDesc = document.querySelector('header p');
    const currentTrackCover = document.querySelector('header img');
    const currentTrackAudio = document.querySelector('audio');
    const playPauseBtn = document.querySelector('.event-playPause');
    const muteUnmuteBtn = document.querySelector('.event-muteUnmute');
    const playNextBtn = document.querySelector('.event-next');
    const playPrevBtn = document.querySelector('.event-prev');
    const progress = document.querySelector('.slider-progress');
    const currentTrackTime = document.querySelector('.count-current');
    const finalTrackTime = document.querySelector('.count-final');
    // ADD TRACKS TO MY PLAYLIST ON PAGE LOAD
    (function addMyTracksList() {
        for (let track of tracksList) {
            var li = document.createElement('li');
            li.id = track.id;
            li.innerHTML = `
                      <div class="track-number">0${track.id}</div>
                      <img
                      src=${track.coverSrc}
                      class="track-img"
                      alt=""
                      />
  
                      <div class="track-detail">
                      <div class="track-detail_name">${track.name}</div>
                      <div class="track-detail_desc">
                          <small>${track.desc}</small>
                      </div>
                      </div>
          `;
            document.querySelector('ul').appendChild(li);
            (function (id) {
                li.addEventListener(
                    'click',
                    () => {
                        playSelectedTrack(id);
                    },
                    false
                );
            })(track.id);
        }
    })();

    let trackId = 0;

    const loadTrack = (songId) => {
        const song = tracksList.find((track) => track.id === songId);

        const { audioSrc, coverSrc, name, desc } = song;
        currentTrackName.innerText = name;
        currentTrackDesc.innerText = desc;
        currentTrackAudio.src = audioSrc;
        currentTrackCover.src = coverSrc;
    };

    const playSelectedTrack = (songId) => {
        trackId = songId;
        loadTrack(songId);
        playTrack();
    };

    loadTrack(trackId);

    const playTrack = () => {
        playPauseBtn.classList.remove('fa-play');
        playPauseBtn.classList.add('fa-pause');

        currentTrackAudio.play();
    };

    const pauseTrack = () => {
        playPauseBtn.classList.remove('fa-pause');
        playPauseBtn.classList.add('fa-play');

        currentTrackAudio.pause();
    };

    const playPrevTrack = () => {
        trackId--;

        if (trackId < 0) {
            trackId = tracksList.length - 1;
        }
        loadTrack(trackId);
        playTrack();
    };

    const playNextTrack = () => {
        trackId++;
        if (trackId > tracksList.length - 1) {
            trackId = 0;
        }
        loadTrack(trackId);
        playTrack();
    };

    const updateProgress = () => {
        const currentTime = currentTrackAudio.currentTime;
        const trackDuration = currentTrackAudio.duration;
        const percent = (currentTime / trackDuration) * 100;
        progress.style.width = percent + '%';
        let curMins = Math.floor(currentTime / 60);
        let curSecs = Math.floor(currentTime - curMins * 60);
        let durMins = Math.floor(trackDuration / 60) || '--';
        let durSecs = Math.floor(trackDuration - durMins * 60) || '--';

        if (curMins < 10) {
            curMins = `0${curMins}`;
        }
        if (curSecs < 10) {
            curSecs = `0${curSecs}`;
        }
        if (durMins < 10) {
            durMins = `0${durMins}`;
        }
        if (durSecs < 10) {
            durSecs = `0${durSecs}`;
        }

        currentTrackTime.innerText = `${curMins}:${curSecs}`;
        finalTrackTime.innerText = `${durMins}:${durSecs}`;
    };

    const muteUnmuteTrack = () => {
        if (currentTrackAudio.muted) {
            currentTrackAudio.muted = false;
            muteUnmuteBtn.classList.remove('fa-volume-mute');
            muteUnmuteBtn.classList.add('fa-volume-up');
        } else {
            currentTrackAudio.muted = true;
            muteUnmuteBtn.classList.remove('fa-volume-up');
            muteUnmuteBtn.classList.add('fa-volume-mute');
        }
    };

    playPauseBtn.addEventListener('click', () => {
        const currentlyPlaying = playPauseBtn.classList.contains('fa-pause');

        currentlyPlaying ? pauseTrack() : playTrack();
    });
    muteUnmuteBtn.addEventListener('click', () => muteUnmuteTrack());

    playPrevBtn.addEventListener('click', () => playPrevTrack());
    playNextBtn.addEventListener('click', () => playNextTrack());

    currentTrackAudio.addEventListener('timeupdate', () => updateProgress());
});