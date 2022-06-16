import React, { ReactElement } from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import CharachorderLogoImage from '../assets/cc_logo_transparent.png';
import BackButton from '../pages/dashboard/components/BackButton';
import { ROUTER_PATHS } from './router';
import {FaBars} from 'react-icons/fa'




const Footer = (): ReactElement => {
  const history = useHistory();
  const needsBackButton = history.location.pathname.endsWith(
    ROUTER_PATHS.training,
  );
  const needsBackButton2 = history.location.pathname.endsWith(
    ROUTER_PATHS.manager,
);
const needsBackButton3 = history.location.pathname.endsWith(
  ROUTER_PATHS.piano,
);
  return (
   <FooterContainer>
       <FooterWrap>
           <FooterLinksContainer>
               <FooterLinksWrapper>
                   <FooterLinkItems>
                       <FooterLinkTitle>
                           <FooterLinkLogo src={CharachorderLogoImage}></FooterLinkLogo>
                           <div/>
                           <FooterLink>Sponsored by CharaChorder</FooterLink>
                           <div/>
                           <FooterLink>This text was typed at the speed of thought.</FooterLink>
                       </FooterLinkTitle>
                   </FooterLinkItems>
               </FooterLinksWrapper>
           </FooterLinksContainer>
       </FooterWrap>
   </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer `
background-color: #181818;
`

const FooterWrap = styled.div `
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 1100px;
margin: 0 auto;
`;

const FooterLinksContainer = styled.div `
display: flex;
justify-content: center;

@media screen and (max-width: 820px) {
    padding-top: 32px;
}
`

const FooterLinksWrapper = styled.div `
display: flex;

@media screen and (max-width: 820px) {
    flex-direction: column;
}
`;

const FooterLinkItems = styled.div `
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
width: 300px;
box-sizing: border-box;
color #fff

@media screen and (max-width: 420px){
    margin 0;
    padding: 10px;
    width: 100%;
}
`;

const FooterLinkTitle = styled.h1 `
font-size: 14px;
margin-bottom: 16px
`

const FooterLink = styled.a `
color: #fff;
text-decoration: none;
margin-bottom: 0.5rem;
font-size: 14px;

&:hover {
    color: #01bf71;
    transition: 0.3s ease out;
}
`;

const FooterLinkLogo = styled.img `
color: #fff;
text-decoration: none;
margin-bottom: 0.5rem;
font-size: 14px;
height: 40px;
display: block;
margin-left: auto;
margin-right: auto;
&:hover {
    color: #01bf71;
    transition: 0.3s ease out;
}
`;