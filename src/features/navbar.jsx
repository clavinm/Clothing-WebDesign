import styled from 'styled-components';
import logo from '../assets/logoo.png';
import Row from '../components/Row';

const NavbarContainer = styled.nav`
  background-color: #ff6700;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
`;

const NavbarLink = styled.a`
  color: white;
  text-decoration: none;
  margin-right: 20px;
  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

const LogoImage = styled.img`
  width: 250px;
  height: 100px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export default function Navbar() {
  return (
    <NavbarContainer>
      <Row>
        <NavbarLink href="#">Shop</NavbarLink>
        <NavbarLink href="#">Product</NavbarLink>
        <NavbarLink href="#">Discover</NavbarLink>
        <NavbarLink href="#">Collection</NavbarLink>
      </Row>
      <LogoImage src={logo} alt="Logo" />
    </NavbarContainer>
  );
}
