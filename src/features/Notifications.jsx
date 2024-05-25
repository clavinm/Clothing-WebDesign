import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ff7600;;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 30px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004494;
  }
`;

export default function Notifications() {
  const [notificationMessage, setNotificationMessage] = useState('');

  const sendNotification = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      return;
    }

    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Permission denied to show notifications');
        return;
      }
    }

    const title = 'What PWA Can Do Today';
    const options = {
      body: notificationMessage,
    };

    if ('serviceWorker' in navigator && 'showNotification' in ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, options);
      });
    } else {
      new Notification(title, options);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendNotification();
  };

  return (
    <Container>
      <Title>Notification</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter notification message"
          value={notificationMessage}
          onChange={(e) => setNotificationMessage(e.target.value)}
        />
        <Button type="submit">Send Notification</Button>
      </Form>
    </Container>
  );
}
