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
        //transform: `rotate(${rotation}deg)`,
        transformBox: 'fill-box',
        transformOrigin: 'center',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="9 9 9 9"
        className="absolute inset-0"
      >
          <rect width="100" height="100" fill={`${active ? '#43e272' : '#8099E5'}`}/>

     
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
