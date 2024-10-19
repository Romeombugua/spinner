import React, { useState, useEffect } from 'react';
import './index.css';
import Spinner from './Spinner';
import ConfettiExplosion from 'react-confetti-explosion';

const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank'];
const predeterminedWinner = 'Bob';

function App() {
  const [winner, setWinner] = useState('');
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    if (spinning) {
      setTimeout(() => {
        alert(`The winner is: ${winner}! Refresh page for new game.`);
        setIsExploding(true); // Trigger confetti explosion
        setTimeout(() => setIsExploding(false), 3000); // Stop confetti after 3 seconds
        setSpinning(false);
      }, 5000);
    }
  }, [spinning, winner]);

  const spin = () => {
    let winnerIndex;
    if (predeterminedWinner && names.includes(predeterminedWinner)) {
      winnerIndex = names.indexOf(predeterminedWinner);
    } else {
      winnerIndex = Math.floor(Math.random() * names.length);
    }

    const newRotation = 360 * 5 + (340 - (winnerIndex / names.length) * 360);
    setRotation(newRotation);
    setWinner(names[winnerIndex]);
    setSpinning(true);
  };

  return (
    <div id="game-container">
      <p> Contact me on Whatsapp: +254745187680</p>
      {isExploding && <ConfettiExplosion />}
      <div id="spinner-container">
        <div id="arrow"></div>
        <Spinner names={names} rotation={rotation} />
      </div>
      <button id="spin-button" onClick={spin} disabled={spinning}>
        {spinning ? 'Good luck!' : 'Spin'}
      </button>
    </div>
  );
}

export default App;
