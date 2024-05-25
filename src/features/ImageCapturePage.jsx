import { useEffect, useRef } from 'react';

const ImageCapturePage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoElement.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing the camera: ', err);
      });
  }, []);

  const handleCaptureClick = () => {
    const videoElement = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL('image/png');
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '100%';
    imageContainerRef.current.innerHTML = '';
    imageContainerRef.current.appendChild(img);
  };

  return (
    <div>
      <h1>Image Capture</h1>
      <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '300px' }}></video>
      <button onClick={handleCaptureClick}>Capture Image</button>
      <div ref={imageContainerRef}></div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default ImageCapturePage;
