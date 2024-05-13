
import styled from 'styled-components';

const FooterSection = styled.footer`
  background-color: #ff6700;
  color: white;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
    margin-left: 20px;
  font-weight: bold;
`;

const CopyRight = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  margin-left: 20px;
`;

export default function Footer() {
  return (
    <FooterSection>
      <Logo>LogoIpsum</Logo>
      <CopyRight>@ All rights reserved</CopyRight>
      <Links>
        <Link href="#">Terms</Link>
        <Link href="#">Privacy</Link>
        <Link href="#">Contact Us</Link>
      </Links>
    </FooterSection>
  );
}
