import React from 'react';

function Spinner({ names, rotation }) {
  const totalSections = names.length;

  return (
    <div
      id="spinner"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {names.map((name, index) => {
        const angle = (index / totalSections) * 360;
        const sectionAngle = 360 / totalSections;

        return (
          <div
            key={name}
            className="name"
            style={{
              transform: `rotate(${angle}deg) translate(0, -135px) rotate(${sectionAngle / 2}deg)`,
            }}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
}

export default Spinner;
