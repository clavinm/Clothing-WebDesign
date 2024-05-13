import styled from 'styled-components';
import { FaArrowRight,FaCartArrowDown  } from "react-icons/fa";
import p15 from '../assets/p15.png';
import p16 from '../assets/p16.png';
import Row from '../components/Row';

const TrendingSection = styled.section`
  text-align: left;
  background-color: black;
  color: white;
  padding: 40px 0;
  padding-left: 20px;
`;

const Heading = styled.h2`
color: #ff6700;
  font-size: 60px;
  text-transform: capitalize;
  margin-bottom: 40px;
  align-items: left;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: left;
   
`;

const Card = styled.div`
 border: 2px solid #ff6700;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
  padding: 20px;
  width: 680px;
`;

const ProductImage = styled.img`
  border-radius: 8px;
  height: 400px;
  width: 100%;
  margin-bottom: 10px;
`;
const ProductName = styled.p`
  color: #ff6700;
  font-size: 24px;
  margin-top: 10px;
`;
const Horizontal = styled.hr`
  border: 0.5px solid #ff6700;
  margin: 10px 0;
`;
const Button = styled.button`
    background-color: black;
    color: #ff6700;
    border: 1px solid #ff6700;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.3s;
    margin: 7px;
    &:hover {
        color: white;
      background-color: #ff6700;
      transform: scale(1.1);
    }
    `;

export default function About() {
    
  return (
    <TrendingSection>
      <Heading>About Us</Heading>
      <CardContainer>
        <Card>
          <ProductImage src={p15} alt="Products" />
          <ProductName>{}</ProductName>
          <Horizontal />
          <Row> <Button><Row>Learn More<Row>{<FaArrowRight />}</Row></Row></Button>
            <Row $contentPosition="left"><Button>{<FaCartArrowDown />}</Button></Row>
            </Row>
        </Card>
        <Card>
          <ProductImage src={p16} alt="Products" />
          <ProductName>{}</ProductName>
          <Horizontal />
           <Row> <Button><Row>Learn More<Row>{<FaArrowRight />}</Row></Row></Button>
            <Row $contentPosition="left"><Button>{<FaCartArrowDown />}</Button></Row>
            </Row>
        </Card>
      </CardContainer>
    </TrendingSection>
  );
}
