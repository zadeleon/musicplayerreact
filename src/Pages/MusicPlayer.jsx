import { useState, useEffect } from "react";
import useSound from "use-sound";
import sampleSound1 from "../music/SZA - Big Boy.mp3";
import sampleSound2 from "../music/2pac & Nelly ft Kelly Rowland - Dilema (Remix).mp3";
import sampleSound3 from "../music/Kendrick Lamar - Money Trees (Lyrics)  that's just how i feel be the last one out to get this dough.mp3";
import sampleSound4 from "../music/Kay Flock - PSA (Lyrics)  fantastic lyrics.mp3";
import sampleSound5 from "../music/Teys - LWKY (ft. Keith) (Official Music Video).mp3";
import sampleSound6 from "../music/Roddy Ricch - The Box (Lyrics).mp3";
import sampleSound7 from "../music/Lost Me - Giveon Lyric Music.mp3";
import sampleSound8 from "../music/Akon - Smack That (Lyrics) Ft. Eminem.mp3";
import sampleSound9 from "../music/Doechii - What It Is (Lyrics) ft. Kodak Black.mp3";
import prevButton from "../img/backward.png";
import pauseButton from "../img/pause.png";
import playButton from "../img/play.png";
import forwardButton from "../img/forward-button.png";
import video from "../img/background.mp4";

const songs = [
  { title: "Big Boy", artist: "SZA", url: sampleSound1 },
  { title: "Dilema (Remix)", artist: "2Pac & Nelly ft Kelly Rowland", url: sampleSound2 },
  { title: "Money Trees", artist: "Kendrick Lamar", url: sampleSound3 },
  { title: "PSA", artist: "Kay Flock", url: sampleSound4 },
  { title: "LWKY (ft. Keith)", artist: "Teys", url: sampleSound5 },
  { title: "The Box", artist: "Roddy Ricch", url: sampleSound6 },
  { title: "Lost Me",artist: "Giveon", url: sampleSound7},
  { title: "Smack That",artist: "Akon", url: sampleSound8},
  { title: "What It Is",artist: "Doechii", url: sampleSound9}
];

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const [play, { pause,stop, duration, sound }] = useSound(songs[currentSongIndex].url);
  const [currentTime, setCurrentTime] = useState(0);
  const [currTime, setCurrTime] = useState({min: "",sec: "",});
  const [time, setTime] = useState({min: "",sec: ""});
  const [seconds, setSeconds] = useState(0);
  const [videoOpacity, setVideoOpacity] = useState(0);
  

  useEffect(() => {
    if (sound) {
      stop();
    }
    if(isPlaying)
    {
      play();
    }
    return () => {
      if (sound) {
        pause();
      }
    };
  }, [currentSongIndex, play, stop,pause, sound]);

  useEffect(() => {
    const sec = duration / 1000;
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    setTime({
      min: min,
      sec: secRemain
    })
  },[duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])); 
        const min = Math.floor(sound.seek() / 60);
        const sec = Math.floor(sound.seek() % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  function playingButton(e) {
    e.preventDefault();
    if (isPlaying) {
      pause();
      setCurrentTime(sound.seek());
      setVideoOpacity(0); 
    } else {
      play();
      sound.seek(currentTime);
      setVideoOpacity(1); 
    }
    setIsPlaying(!isPlaying);
  };

  function nextButton() {
    stop();
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  }

  function backButton() {
    stop();
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length; 
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
    setCurrentTime(0); 
  }


  return (
    <>
    <div className="video-wrapper" style={{ opacity: videoOpacity, transition: 'opacity 1s ease-in-out' }}>
      <video className='videoTag' autoPlay loop muted>
        <source src={video} type='video/mp4' />
      </video>
    </div>

      <div className="music-player">
        <div className="music-player__navigation">
          <div className="music-player__app-name">Music Player</div>
          <div className="music-player__app-registration">Login</div>
        </div>

        <div className="music-player__player-container">
          <div className="music-player__about-artist">
            <div className="music-player__artist-song">{songs[currentSongIndex].title}</div>
            <div className="music-player__artist-name">{songs[currentSongIndex].artist}.</div>
          </div>

          <div className="music-player__timenduration">
            <div className="music-player__time">
              <p>
                {currTime.min}:{currTime.sec}
              </p>
              <p>
                {time.min}:{time.sec}
              </p>
            </div>

            <input
              type="range"
              min="0"
              max={duration / 1000}
              default="0"
              value={seconds}
              className="music-player__timeline"
              onChange={(e) => {
                sound.seek([e.target.value]);
              }}
            />
          </div>

          <div className="music-player__control-buttons">
            <img 
            className="music-player__control-button" 
            onClick={backButton}
            alt="previous"
            src={prevButton}
            ></img>

            <img 
            className="music-player__control-button" 
            onClick={playingButton}
            alt="playpause"
            src={isPlaying ? pauseButton:playButton}>
            </img>

            <img 
            className="music-player__control-button" 
            onClick={nextButton}
            alt="next"
            src={forwardButton}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;