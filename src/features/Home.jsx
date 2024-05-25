import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import fashionImage1 from '../assets/card1.png';
import Row from '../components/Row';

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
`;

const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Card = styled.div`
    width: 100%;
    max-width: 50vw;
    background-color: #fff;
    padding: 2vw;
    border-radius: 10px;
    box-shadow: 0 2vw 4vw rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
    width: 100%;
    border-radius: 2vw;
   
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

const StyledH2 = styled.h2`
    text-align: center;
    color: black;
    font-size: 3vw;
    font-style: italic;
    margin-top: 5vw;
`;

const BlackBackground = styled.span`
    border-radius: 2vw;
    color: #ff7600;
    background-color: black;
`;

export default function Home() {
  const history = useHistory();

  const handleImageCaptureClick = () => {
    console.log('Image Capture Clicked');
    history.push('/capture');
  };
    return (
        <HomeSection>
            <HomeHeader>
                <StyledH1>Fashion</StyledH1>
                <HeaderRight>
                    <div>New Summer Collection</div>
                    <div>Get now and empty your summer vacation</div>
                    <ShopNowButton id="installButton">Install</ShopNowButton>
                    <ShopNowButton id="imageCaptureButton" onClick={handleImageCaptureClick}>
                        Image Capture
                    </ShopNowButton>
                    <ShopNowButton id="triggerInstall">Install Now</ShopNowButton>
                </HeaderRight>
            </HomeHeader>
            <CardsContainer>
                <Row>
                    <Card>
                        <ProductImage src={fashionImage1} alt="Fashion Image 1" />
                    </Card>
                    <Card>
                        <ProductImage src={fashionImage1} alt="Fashion Image 2" />
                    </Card>
                </Row>
            </CardsContainer>
            <div className="desc">
                <StyledH2>Where <BlackBackground>fashion takes</BlackBackground> the helm, and you embark on a journey</StyledH2>
            </div>
        </HomeSection>
    );
}
