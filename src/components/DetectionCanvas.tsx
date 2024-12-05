import React from 'react';

interface DetectionCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const DetectionCanvas: React.FC<DetectionCanvasProps> = ({ canvasRef }) => {
  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0"
      width={640}
      height={480}
    />
  );
};