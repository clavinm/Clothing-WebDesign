import { useState, useRef } from 'react';
import styled from 'styled-components';

const MediaCaptureContainer = styled.div`
  text-align: center;
  max-width: 600px;
  margin: auto;
`;

const VideoElement = styled.video`
  max-width: 100%;
  margin: 10px 0;
`;

const Controls = styled.div`
  margin: 20px 0;
  &.hidden {
    display: none;
  }
`;

const Button = styled.button`
  background-color: #008cba;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005f5f;
  }

  &.open-camera {
    background-color: #007bff;
    &:hover {
      background-color: #0056b3;
    }
  }

  &.recording {
    background-color: #4CAF50;
    &:hover {
      background-color: #45a049;
    }
  }

  &.capture {
    background-color: #ff9800;
    &:hover {
      background-color: #e68900;
    }
  }

  &.download {
    background-color: #007bff;
    text-decoration: none;
    &:hover {
      background-color: #0056b3;
    }
  }

  &.cancel {
    background-color: #6c757d;
    &:hover {
      background-color: #5a6268;
    }
  }

  &.close {
    background-color: #ff0000;
    &:hover {
      background-color: #cc0000;
    }
  }

  &.toggle {
    background-color: #ff9800;
    &:hover {
      background-color: #e68900;
    }
  }
`;

const MediaOutput = styled.div`
  margin-top: 20px;
`;

const MediaCapture = () => {
  const [cameraOpened, setCameraOpened] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [fileName, setFileName] = useState('');
  const [facingMode, setFacingMode] = useState('user');
  const [currentStream, setCurrentStream] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);

  const showNotification = (message) => {
    // Implement a notification system here
    alert(message);
  };

  const openCamera = async () => {
    setCameraOpened(true);
    await startCamera();
    showNotification('Camera opened');
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
        audio: true,
      });
      handleStream(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
      showNotification(`Error accessing camera: ${error.message}`);
    }
  };

  const handleStream = (stream) => {
    setCurrentStream(stream);
    videoRef.current.srcObject = stream;
  };

  const stopStream = (stream) => {
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
  };

  const toggleCamera = async () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
    try {
      if (currentStream) {
        stopStream(currentStream);
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
        audio: true,
      });
      handleStream(stream);
      showNotification(`Switched to ${facingMode === 'user' ? 'front' : 'back'} camera`);
    } catch (error) {
      console.error("Error toggling camera:", error);
      showNotification(`Error toggling camera: ${error.message}`);
    }
  };

  const startRecording = () => {
    resetMedia();
    setIsVideo(true);
    setFileName('video.mp4');
    const stream = videoRef.current.srcObject;
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
      chunksRef.current = [];
      setMediaUrl(URL.createObjectURL(blob));
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
    showNotification('Recording started');
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      showNotification('Recording stopped');
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const captureImage = () => {
    resetMedia();
    setIsVideo(false);
    setFileName('image.png');
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setMediaUrl(canvas.toDataURL('image/png'));
    showNotification('Image captured');
  };

  const closeCamera = () => {
    setCameraOpened(false);
    if (currentStream) {
      stopStream(currentStream);
    }
    showNotification('Camera closed');
  };

  const cancelMedia = () => {
    resetMedia();
    showNotification('Media cancelled');
  };

  const resetMedia = () => {
    setMediaUrl(null);
    setIsVideo(false);
    setFileName('');
  };

  return (
    <MediaCaptureContainer>
      <VideoElement ref={videoRef} autoPlay></VideoElement>
      <Controls className={!cameraOpened ? '' : 'hidden'}>
        <Button onClick={openCamera} className="open-camera">Open Camera</Button>
      </Controls>
      <Controls className={cameraOpened ? '' : 'hidden'}>
        <Button onClick={toggleRecording} className="recording">
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
        <Button onClick={captureImage} className="capture">Capture Image</Button>
        <Button onClick={toggleCamera} className="toggle">Switch Camera</Button>
        <Button onClick={closeCamera} className="close">Close Camera</Button>
      </Controls>
      {mediaUrl && (
        <MediaOutput>
          <h3>Captured Media</h3>
          {isVideo ? (
            <VideoElement src={mediaUrl} controls></VideoElement>
          ) : (
            <img src={mediaUrl} alt="Captured" />
          )}
          <Button as="a" href={mediaUrl} download={fileName} className="download">Download {isVideo ? 'Video' : 'Image'}</Button>
          <Button onClick={cancelMedia} className="cancel">Cancel</Button>
        </MediaOutput>
      )}
    </MediaCaptureContainer>
  );
};

export default MediaCapture;
