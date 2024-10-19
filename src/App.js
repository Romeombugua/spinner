import React, { useState, useEffect } from 'react';
import './index.css';
import Spinner from './Spinner';
import ConfettiExplosion from 'react-confetti-explosion';

const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hannah'];
const predeterminedWinner = 'Bob';

const WinnerModal = ({ isOpen, onClose, winner }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>We Have a Winner!</h2>
        <p>Congratulations to our lucky winner!</p>
        <div className="winner-name">{winner}</div>
        <p>Thank you for playing! Refresh page for new game</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

function App() {
  const [winner, setWinner] = useState('');
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (spinning) {
      setTimeout(() => {
        setIsModalOpen(true);
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="game-container">
      {isExploding && <ConfettiExplosion />}
      <div id="spinner-container">
        <div id="arrow"></div>
        <Spinner names={names} rotation={rotation} />
      </div>
      <button id="spin-button" onClick={spin} disabled={spinning}>
        {spinning ? 'Good luck!' : 'Spin'}
      </button>
      <WinnerModal isOpen={isModalOpen} onClose={closeModal} winner={winner} />
    </div>
  );
}

export default App;