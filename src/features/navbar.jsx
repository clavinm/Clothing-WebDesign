import styled from 'styled-components';
import logo from '../assets/logoo.png';
import Row from '../components/Row';

const NavbarContainer = styled.nav`
  background-color: #ff6700;
  padding: 10px 20px;
  display: flex;
  justify-content: left;
  margin-top: 20px;
  margin-left: 20px;

`;

const NavbarLink = styled.a`
  color: white;
  text-decoration: none;
  margin-right: 20px;
`;

export default function Navbar() {
  return (
    <NavbarContainer>
    <Row>
      <Row>
        <NavbarLink href="#">Shop</NavbarLink>
        <NavbarLink href="#">Product</NavbarLink>
        <NavbarLink href="#">Discover</NavbarLink>
        <NavbarLink href="#">Collection</NavbarLink>
      </Row>
      <Row><img src={logo} alt="Logo" style={{ margin:'0 200px',width: '250px', height: '100px' }} /></Row>
      </Row>
    </NavbarContainer>
  );
}
