import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import memoryGameLogo from "assets/img/memory-game-logo.png";

const GameProgress = ({ handleNewGame }) => { // Terima fungsi handleNewGame sebagai prop

  const {
    currentLevel, levelCount
  } = useSelector(state => state.game);

  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (startTime === null) {
      setStartTime(new Date().getTime());
    }

    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTimeInSeconds = Math.round((currentTime - startTime) / 1000);
      setElapsedTime(elapsedTimeInSeconds);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  let levelProgressWidth = Math.round(currentLevel / levelCount * 100).toString() + "%";

  // handleNewGame akan dipanggil saat tombol New Game diklik
  const handleNewGameClick = () => {
    setStartTime(new Date().getTime());
    setElapsedTime(0);
    handleNewGame(); // Panggil handleNewGame untuk mereset kondisi permainan
  };

  return (
    <div className="game-item-head">
      <div className="game-logo">
        <img src={memoryGameLogo} alt="logo" width="100" />
      </div>
      <div className="game-title">Champion Memory</div>
      <div className="game-description-title">This is Memory Game for Child</div>
      <div className="game-progress-text">
        <span>{currentLevel}/{levelCount} level</span>
      </div>
      <div className="game-progress-bar">
        <div className="game-progress-line" style={{ width: levelProgressWidth, marginTop: "20px" }}></div>
      </div>
      <div className="game-elapsed-time" style={{ fontFamily: "Arial, sans-serif", marginTop: "20px" }}>
        Elapsed time: {formatElapsedTime()}
      </div>
      <button onClick={handleNewGameClick}>New Game</button> {/* Panggil handleNewGameClick saat tombol diklik */}
    </div>
  );

  function formatElapsedTime() {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

export default GameProgress;
