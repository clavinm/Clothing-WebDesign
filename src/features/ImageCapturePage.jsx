import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  max-width: 600px;
  margin: auto;
`;

const Video = styled.video`
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
`;

const Canvas = styled.canvas`
  display: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  margin: 20px 0;
`;

const DownloadLink = styled.a`
  display: block;
  margin-top: 10px;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ImageCapturePage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [, setNotification] = useState('');

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length > 0) {
          setCameraDevices(videoDevices);
          setSelectedCamera(videoDevices[0].deviceId);
        } else {
          setNotification('No video devices found.');
        }
      } catch (err) {
        setNotification('Error fetching camera devices: ' + err.message);
      }
    };
    fetchCameras();
  }, []);

  useEffect(() => {
    if (selectedCamera) {
      startVideoStream(selectedCamera);
    }
  }, [selectedCamera]);

  const startVideoStream = async (deviceId) => {
    try {
      const videoElement = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId }, audio: true });
      videoElement.srcObject = stream;
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
      };
    } catch (err) {
      setNotification('Error accessing the camera: ' + err.message);
    }
  };

  const handleCaptureClick = () => {
    const videoElement = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL('image/png');
    setImageURL(imageUrl);
  };

  const handleStartStopRecording = () => {
    if (isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setNotification('Recording stopped.');
    } else {
      mediaRecorder.start();
      setIsRecording(true);
      setNotification('Recording started.');
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  const cancelImageCapture = () => {
    setImageURL(null);
  };

  const cancelVideoCapture = () => {
    setVideoURL(null);
  };

  return (
    <Container>
      <h1>Image and Video Capture</h1>
      {/* {notification && <Notification message={notification} />} */}
      <select value={selectedCamera} onChange={handleCameraChange}>
        {cameraDevices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </option>
        ))}
      </select>
      <Video ref={videoRef} autoPlay></Video>
      <Button onClick={handleCaptureClick}>Capture Image</Button>
      <Button onClick={handleStartStopRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      {imageURL && (
        <div>
          <Image src={imageURL} alt="Captured" />
          <DownloadLink href={imageURL} download="captured-image.png">Download Image</DownloadLink>
          <Button onClick={cancelImageCapture}>Cancel</Button>
        </div>
      )}
      <Canvas ref={canvasRef}></Canvas>
      {videoURL && (
        <div>
          <Video src={videoURL} controls></Video>
          <DownloadLink href={videoURL} download="captured-video.webm">Download Video</DownloadLink>
          <Button onClick={cancelVideoCapture}>Cancel</Button>
        </div>
      )}
    </Container>
  );
};

export default ImageCapturePage;
