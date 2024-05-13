import styled from 'styled-components';
import { FaArrowRight } from "react-icons/fa";
import {data}  from '../data';

const TrendingSection = styled.section`
  text-align: center;
  background-color: black;
  color: white;
  padding: 40px 0;
`;

const Heading = styled.h2`
color: #ff6700;
  font-size: 60px;
  text-transform: capitalize;
  margin-bottom: 40px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Card = styled.div`
 border: 2px solid #ff6700;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
  padding: 20px;
  width: 300px;
  @media (max-width: 768px) {
    width: 100%; 
  }
`;

const ProductImage = styled.img`
  border-radius: 8px;
  height: 300px;
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

export default function Trending() {
    
  return (
    <TrendingSection>
      <Heading>Best of the Week</Heading>
      <CardContainer>
      {data.slice(0, 3).map((product, index) => (
        <Card key={index}>
          <ProductImage src={product.img} alt="Products" />
          <ProductName>{product.title}</ProductName>
          <Horizontal />
            <Button>T-shirt</Button>
            <Button>Men</Button>
            <Button>{<FaArrowRight />}</Button>
        </Card>
      ))}
      </CardContainer>
    </TrendingSection>
  );
}
