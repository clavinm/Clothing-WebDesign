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

  useEffect(() => {
    const videoElement = videoRef.current;
    navigator.mediaDevices.getUserMedia({ video: true })
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
    setImageURL(imageUrl);
  };

  const handleStartStopRecording = () => {
    if (isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    } else {
      const recorder = mediaRecorder;
      recorder.start();
      setIsRecording(true);
    }
  };

  return (
    <Container>
      <Title>Image and Video Capture</Title>
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
      </>
      )}
      </ImageContainer>
      <Canvas ref={canvasRef}></Canvas>
      {videoURL && (
        <div>
          <Video src={videoURL} controls></Video>
          <DownloadLink href={videoURL} download="captured-video.webm">Download Video</DownloadLink>
        </div>
      )}
    </Container>
  );
};

export default ImageCapturePage;
