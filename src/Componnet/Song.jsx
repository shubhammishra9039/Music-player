import React, { useState, useRef } from "react";

import Audio1 from '../Audio/Apna Bana Le.mp3';
import Audio2 from '../Audio/Soni Soni.mp3';
import image from '../Image/apna bna le.jpeg'
import image2 from '../Image/Soni-Soni.jpg'
import { FaStepBackward, FaPlayCircle, FaPauseCircle, FaStepForward } from 'react-icons/fa';
import { TfiLoop } from 'react-icons/tfi';
import { TbBalloonOff } from 'react-icons/tb';

import "./CSS/Song1.css";

function Song() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const audioRef = useRef(null);
  const [timer,setTimer]=useState(0)

  const songs = [
    {
      title: "Apna Bana Le",
      image: image,
      src: Audio1
    },
    {
      title: "Soni Soni",
      image: image2,
      src: Audio2
    }
  ];

  const currentSong = songs[currentSongIndex];

  // Play or Pause function
  const playOrPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };



  // Time Handler function


  function formatTime(seconds) {
   
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
  
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  
    
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  

  
  const timeHandlerFunction = (e) => {
    setCurrentTime(e.target.currentTime);
    let timerchang=Math.floor(e.target.currentTime)
   timerchang=formatTime(timerchang)

    
    setTimer(timerchang);
  };

  // Drag Handler function
  const dragHandlerFunction = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  // Skip forward and backward function
  const skipForwardReverse = (direction) => {
    if (direction === "skip-forward") {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    } else if (direction === "skip-back") {
      setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    }
  };

  return (
    <div className="container">
      <div className="song-container">
      <img src={currentSong.image} alt="" />
        <h1 className='head'><marquee behavior="" direction="">{currentSong.title}</marquee></h1>

        <audio
          ref={audioRef}
          src={currentSong.src}
          onTimeUpdate={timeHandlerFunction}
          onEnded={() => skipForwardReverse("skip-forward")}
          loop={isLooping}
        ></audio>

        <div className='input-name'>
          <input
            type="range"
            value={currentTime}
            max={audioRef.current?.duration || 0}
            onChange={dragHandlerFunction}
          />
          <p>{timer}</p>
        </div>

        <div className='btn'>
          <button onClick={() => skipForwardReverse("skip-back")} ><FaStepBackward /></button>
          <button onClick={playOrPauseHandler}>{isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}</button>
          <button onClick={() => skipForwardReverse("skip-forward")}><FaStepForward /></button>
          <button onClick={() => setIsLooping(!isLooping)}>{isLooping ? <TfiLoop /> : <TbBalloonOff />}</button>
        </div>
      </div>
    </div>
  );
}

export default Song;
