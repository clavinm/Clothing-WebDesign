import './Home.css';
import fashionImage1 from '../assets/card1.png'; // Import the image from assets folder
import fashionImage2 from '../assets/card222.png'; // Import another image from assets folder
import styled from 'styled-components';

const StyledH1 = styled.h1`
    text-align: center;
    font-weight: bold;
    color: black;
    font-size: 10em; 
    font-style: italic;
    text-transform: uppercase; 
`;
const StyledH2 = styled.h2`
    margin-top: 50px;
    text-align: center;
    color: black;
    font-size: 3em; 
    font-style: italic;
`;
const BlackBackground = styled.span`
border-radius: 20px;
color: #ff7600;
  background-color: black;
`;
export default function Home() {
    return (
        <section className="home-section">
            <div className="home-header">
                <div className="header-left">
                    <StyledH1>Fashion</StyledH1> 
                </div>
                <div className="header-right">
                    <div>New Summer Collection</div>
                    <div className="subtext">Get now and empty your summer vacation</div>
                    <button className="shop-now-button">Shop Now</button>
                </div>
            </div>
            <div className="cards-container">
                <div className="card1">
                    <img src={fashionImage1} alt="Fashion Image 1" />
                </div>
                <div className="card">
                    <img src={fashionImage2} alt="Fashion Image 2" />
                </div>
            </div>
            <div className="desc">
                <StyledH2>Where <BlackBackground>fashion takes</BlackBackground> the helm,and you embark on a journey</StyledH2>
            </div>
        </section>
    );
}
