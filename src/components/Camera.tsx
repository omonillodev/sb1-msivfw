import React from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "environment"
};

interface CameraProps {
  webcamRef: React.RefObject<Webcam>;
}

export const Camera: React.FC<CameraProps> = ({ webcamRef }) => {
  return (
    <Webcam
      ref={webcamRef}
      audio={false}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
      className="rounded-lg shadow-lg"
      width={640}
      height={480}
    />
  );
};