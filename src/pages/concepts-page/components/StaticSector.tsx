import React, { ReactElement } from 'react';

interface Props {
  posX: number;
  posY: number;
  scale?: number;
  rotation?: number;
  active?: boolean;
  title?: string;
  titleTransformOverride?: string;
}

function StaticSector({
  posX,
  posY,
  active,
  rotation,
  title,
  titleTransformOverride,
}: Props): ReactElement {
  return (
    <div
      style={{
        position: 'absolute',
        width: `50%`,
        top: `${posY}%`,
        left: `${posX}%`,
        transform: `rotate(${rotation}deg)`,
        transformBox: 'fill-box',
        transformOrigin: 'center',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 9 9"
        className="absolute inset-0"
      >
        <path
          d="M 4 0.5 C 4 2 2 4 0.5 4 L 0.5 9 C 5 9 9 5 9 0.5"
          fill={`${active ? '#43e272' : '#8099E5'}`}
        />
      </svg>

      <p
        className="absolute text-black font-bold text-center"
        style={{
          transform: titleTransformOverride || `rotate(-${rotation}deg)`,
          left: 20,
          top: 15,
          lineHeight: 1,
        }}
      >
        {title || ''}
      </p>
    </div>
  );
}

export default StaticSector;
