import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { LoadingScreen } from './LoadingScreen';
import { CameraToggle } from './CameraToggle';
import { drawDetections } from '../utils/drawing';

const videoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: 'environment'
};

export const ObjectDetector = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<cocossd.ObjectDetection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const loadedModel = await cocossd.load({
          base: 'mobilenet_v2'
        });
        setModel(loadedModel);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    loadModel();
  }, []);

  const detect = async () => {
    if (!model || !webcamRef.current || !canvasRef.current || !isCameraOn) return;

    const video = webcamRef.current.video;
    if (!video || video.readyState !== 4) return;

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    try {
      const predictions = await model.detect(video, undefined, 0.6);
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, videoWidth, videoHeight);
      drawDetections(ctx, predictions);
    } catch (error) {
      console.error('Detection error:', error);
    }

    requestAnimationFrame(detect);
  };

  useEffect(() => {
    if (!isLoading) {
      detect();
    }
  }, [isLoading, isCameraOn]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen bg-black">
      <CameraToggle isCameraOn={isCameraOn} onToggle={() => setIsCameraOn(!isCameraOn)} />
      
      <div className="relative flex justify-center items-center min-h-screen">
        {isCameraOn && (
          <>
            <Webcam
              ref={webcamRef}
              audio={false}
              videoConstraints={videoConstraints}
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
          </>
        )}
      </div>
    </div>
  );
};