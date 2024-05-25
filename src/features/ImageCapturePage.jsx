import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const VideoContainer = styled.div`
  margin-bottom: 20px;
`;

const Video = styled.video`
  width: 100%;
  max-width: 300px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
`;

const DownloadLink = styled.a`
  display: block;
  margin-top: 10px;
  text-decoration: none;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Canvas = styled.canvas`
  display: none;
`;

const ImageCapturePage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length > 0) {
          setCameraDevices(videoDevices);
          setSelectedCamera(videoDevices[0].deviceId);
        } else {
          setError('No video devices found.');
        }
      } catch (err) {
        setError('Error fetching camera devices: ' + err.message);
      }
    };
    fetchCameras();
  }, []);

  useEffect(() => {
    if (selectedCamera) {
      startVideoStream(selectedCamera);
    }
  }, [selectedCamera]);

  const startVideoStream = (deviceId) => {
    const videoElement = videoRef.current;
    navigator.mediaDevices.getUserMedia({ video: { deviceId } })
      .then((stream) => {
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
      })
      .catch((err) => {
        setError('Error accessing the camera: ' + err.message);
      });
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
    } else {
      mediaRecorder.start();
      setIsRecording(true);
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
      <Title>Image and Video Capture</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Select value={selectedCamera} onChange={handleCameraChange}>
        {cameraDevices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </option>
        ))}
      </Select>
      <VideoContainer>
        <Video ref={videoRef} autoPlay></Video>
      </VideoContainer>
      <ButtonContainer>
        <Button onClick={handleCaptureClick}>Capture Image</Button>
        <Button onClick={handleStartStopRecording}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
      </ButtonContainer>
      <ImageContainer ref={imageContainerRef}>
        {imageURL && (
          <>
            <Image src={imageURL} alt="Captured Image" />
            <DownloadLink href={imageURL} download="captured-image.png">Download Image</DownloadLink>
            <DownloadLink onClick={cancelImageCapture}>Cancel</DownloadLink>
          </>
        )}
      </ImageContainer>
      <Canvas ref={canvasRef}></Canvas>
      {videoURL && (
        <div>
          <Video src={videoURL} controls></Video>
          <DownloadLink href={videoURL} download="captured-video.webm">Download Video</DownloadLink>
          <DownloadLink onClick={cancelVideoCapture}>Cancel</DownloadLink>
        </div>
      )}
    </Container>
  );
};

export default ImageCapturePage;
