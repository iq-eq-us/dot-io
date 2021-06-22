import React, { ReactElement, useState, useRef } from 'react';
import StaticSector from './staticSector';

interface Props {
  scale: number;
}

function SectorGroupHelper({ scale }: Props): ReactElement {
  const [isDragging, setIsDragging] = useState(true);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const sectorRef = useRef();

  return (
    <div
      onMouseDown={() => setIsDragging(!isDragging)}
      onMouseMove={(e) => {
        const scale = 0.1;

        if (!isDragging) return;

        setPosX(posX + e.movementX * scale);
        setPosY(posY + e.movementY * scale);
      }}
      ref={sectorRef}
      className="absolute"
      style={{
        width: '100px',
        height: '100px',
        left: `${posX}%`,
        top: `${posY}%`,
        transform: `scale(${scale})`,
      }}
    >
      <StaticSector
        posX={35}
        posY={0}
        rotation={45}
        active={Math.random() > 0.5}
      />
      <StaticSector
        posX={0}
        posY={0}
        rotation={135}
        active={Math.random() > 0.5}
      />
      <StaticSector
        posX={0}
        posY={-35}
        rotation={225}
        active={Math.random() > 0.5}
      />
      <StaticSector
        posX={35}
        posY={-35}
        rotation={315}
        active={Math.random() > 0.5}
      />

      <p className="absolute">{`<SectorGroup left={${posX.toFixed(
        1,
      )}} top={${posY.toFixed(1)}} scale={0.55} />`}</p>
    </div>
  );
}

export default SectorGroupHelper;
