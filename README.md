# Object Detection Web Application

This web application uses TensorFlow.js and the COCO-SSD model to detect objects in real-time using your device's camera.

## Features

- Real-time object detection
- Large, clear object labels
- Camera toggle functionality
- Works on mobile and desktop devices
- High-resolution video support

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## Usage

1. Allow camera access when prompted
2. Point your camera at objects you want to identify
3. The application will display object names in English with confidence scores
4. Use the camera button in the top-right to toggle the camera on/off

## Technical Requirements

- Modern web browser with WebGL support
- Camera access
- JavaScript enabled