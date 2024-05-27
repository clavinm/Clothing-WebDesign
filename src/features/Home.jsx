// import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomeSection = styled.section`
  background-color: #ff7900;
  color: white;
  padding: 5vw 5vw 10vw;
`;

const HomeHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vw;
`;

const HeaderRight = styled.div`
  text-align: center;
  margin-top: 2vw;
  line-height: 1.5;
`;

const ShopNowButton = styled.button`
  background-color: black;
  color: #ff7900;
  border: none;
  padding: 2vw 4vw;
  border-radius: 2vw;
  cursor: pointer;
  font-weight: bold;
  margin-top: 2vw;
  text-decoration: none;
`;

const StyledH1 = styled.h1`
  text-align: center;
  font-weight: bold;
  color: black;
  font-size: 7vw;
  font-style: italic;
  text-transform: uppercase;
  margin-bottom: 3vw;
`;

export default function Home() {
  const navigate = useNavigate();
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    const appInstalled = localStorage.getItem('appInstalled');
    if (appInstalled === 'true') {
      setIsAppInstalled(true);
    }
  }, []);

  const handleImageCaptureClick = () => {
    navigate('/capture');
  };

  return (
    <HomeSection>
      <HomeHeader>
        <StyledH1>Fashion</StyledH1>
        <HeaderRight>
          <div>New Summer Collection</div>
          <div>Get now and enjoy your summer vacation</div>

          {!isAppInstalled && (
            <ShopNowButton id="installButton">Install</ShopNowButton>
          )}
          <ShopNowButton onClick={handleImageCaptureClick}>
            Image Capture
          </ShopNowButton>
          <ShopNowButton as={Link} to="/notification">
            Notification
          </ShopNowButton>
        </HeaderRight>
      </HomeHeader>
    </HomeSection>
  );
}
