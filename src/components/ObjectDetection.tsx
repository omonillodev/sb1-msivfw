import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { Camera, CameraOff } from 'lucide-react';

const ObjectDetection = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<cocossd.ObjectDetection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  // Load the COCO-SSD model
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await cocossd.load();
        setModel(loadedModel);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    loadModel();
  }, []);

  // Detect objects in the video stream
  const detect = async () => {
    if (!model || !webcamRef.current || !canvasRef.current || !isCameraOn) return;

    const video = webcamRef.current.video;
    if (!video || !video.readyState) return;

    // Get video properties
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    video.width = videoWidth;
    video.height = videoHeight;

    // Set canvas dimensions
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // Detect objects
    const predictions = await model.detect(video);
    
    // Draw predictions
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, videoWidth, videoHeight);
    
    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;
      
      // Draw bounding box
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      // Draw label background
      ctx.fillStyle = '#00ff00';
      const textWidth = ctx.measureText(prediction.class).width;
      ctx.fillRect(x, y - 25, textWidth + 10, 25);

      // Draw label text
      ctx.fillStyle = '#000000';
      ctx.font = '18px Arial';
      ctx.fillText(prediction.class, x + 5, y - 5);
    });

    requestAnimationFrame(detect);
  };

  useEffect(() => {
    if (!isLoading) {
      detect();
    }
  }, [isLoading, isCameraOn]);

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleCamera}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          {isCameraOn ? <CameraOff size={24} /> : <Camera size={24} />}
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl font-semibold">Loading model...</div>
        </div>
      ) : (
        <div className="relative">
          {isCameraOn && (
            <Webcam
              ref={webcamRef}
              muted={true}
              className="absolute top-0 left-0 z-0"
              style={{
                width: '100%',
                height: '100vh',
                objectFit: 'cover'
              }}
            />
          )}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-10"
            style={{
              width: '100%',
              height: '100vh'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;