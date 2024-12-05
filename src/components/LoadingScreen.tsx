import React from 'react';

export const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-3xl font-bold text-white text-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading AI Model...</span>
          <p className="text-lg text-gray-400 mt-4">Please allow camera access when prompted</p>
        </div>
      </div>
    </div>
  );
};