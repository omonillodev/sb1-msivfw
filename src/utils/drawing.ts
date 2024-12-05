export const drawDetections = (
  ctx: CanvasRenderingContext2D,
  detections: Array<{
    bbox: [number, number, number, number];
    class: string;
    score: number;
  }>
) => {
  detections.forEach(detection => {
    const [x, y, width, height] = detection.bbox;
    const label = detection.class.toUpperCase();
    const confidence = Math.round(detection.score * 100);

    // Draw bounding box
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    // Set up text style
    ctx.font = 'bold 36px Arial';
    const labelMetrics = ctx.measureText(label);
    const confidenceText = `${confidence}%`;
    const confidenceMetrics = ctx.measureText(confidenceText);
    const textHeight = 45;
    const padding = 15;
    const totalWidth = Math.max(labelMetrics.width, confidenceMetrics.width) + padding * 2;

    // Draw main label background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(
      x,
      y - (textHeight * 2 + padding * 2),
      totalWidth,
      textHeight * 2 + padding * 2
    );

    // Draw label text
    ctx.fillStyle = '#00ff00';
    ctx.fillText(label, x + padding, y - textHeight - padding);
    
    // Draw confidence text
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(confidenceText, x + padding, y - padding);
  });
};