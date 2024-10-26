
import React, { useState, useRef } from 'react';
import './Timer.css';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const ms = String(milliseconds % 1000).padStart(3, '0');
    return `${minutes}:${seconds}:${ms}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => setTime((prev) => prev + 10), 10);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className="timer-container">
      <div className="timer-display">{formatTime(time)}</div>
      <div className="timer-buttons">
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={recordLap} disabled={!isRunning}>Lap</button>
      </div>
      <div className="laps">
        {laps.map((lap, index) => (
          <div key={index} className="lap">
            <span>Lap {index + 1}</span>
            <span>{formatTime(lap)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timer;