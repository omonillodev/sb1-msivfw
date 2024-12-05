import React from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface CameraToggleProps {
  isCameraOn: boolean;
  onToggle: () => void;
}

export const CameraToggle: React.FC<CameraToggleProps> = ({ isCameraOn, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
      aria-label={isCameraOn ? 'Turn camera off' : 'Turn camera on'}
    >
      {isCameraOn ? <CameraOff size={28} /> : <Camera size={28} />}
    </button>
  );
};