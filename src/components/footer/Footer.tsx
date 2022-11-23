import { Container, LogoIcon, LogoText, Rights } from "./Footer.style";
import { ReactComponent as LogoImageText } from "../../assets/icons/logo-text.svg";
import { ReactComponent as LogoImageicon } from "../../assets/icons/logo-icon-filled.svg";

const Footer = () => {
  return (
    <Container>
      <LogoText>
        <LogoImageText />
      </LogoText>
      <LogoIcon>
        <LogoImageicon />
      </LogoIcon>
      <Rights>
        All Rights Reserved &nbsp;|&nbsp;&nbsp;
        <a
          href="https://www.skillupmentor.com"
          target="_blank"
          rel="noreferrer"
        >
          skillupmentor.com
        </a>
      </Rights>
    </Container>
  );
};

export default Footer;
