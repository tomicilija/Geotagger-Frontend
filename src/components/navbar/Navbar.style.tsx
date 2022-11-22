import styled from "styled-components";

/* Navigation */
export const Container = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;

  @media (max-width: 900px) {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    background-color: white;
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;

  padding: 50px 70px;
  width: 100%;

  @media (max-width: 900px) {
    position: relative;
    padding: 30px 35px;
  }
  @media (max-width: 350px) {
    justify-content: flex-start;
    padding: 20px;
  }
`;

export const Logo = styled.div`
  cursor: pointer;

  &.showLogo {
    display: flex;
  }
  &.hideLogo {
    display: none;
  }
  @media (max-width: 900px) {
    padding-right: 40%;
  }
  @media (max-width: 500px) {
    padding-right: 25%;
  }
  @media (max-width: 350px) {
    padding-right: 40%;
    transform: scale(0.7);
    width: 50%;
  }
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-left: -100px;
  @media (max-width: 900px) {
    margin-top: 30px;
    margin-left: 0px;
    padding: 22px;
    border-radius: 1rem;
    overflow: hidden;
    flex-direction: column;
    transition: max-height 0.3s ease-in;
    width: 100%;

    &.showMenuNav {
      display: flex;
    }
    &.hideMenuNav {
      display: none;
    }
  }
`;

export const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 50px;
  p {
    text-align: center;
    color: #233d4d;
  }
  a {
    width: 100%;
  }
  div {
    width: 100%;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0px;
    width: 100%;
    p {
      display: none;
    }
    //In mobile signin should be below signup
    a:nth-child(2) {
      order: 3;
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

export const BorderlessButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 40px;
  margin-right: -30px;
  background: #ffffff;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #233d4d;
  text-transform: capitalize;

  cursor: pointer;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    width: 100%;
    height: 40px;
    margin-top: 10px;

    border: 1px solid #669f89;
    border-radius: 4px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    text-transform: uppercase;
    color: #619b8a;
  }
`;

export const Button = styled.button`
  width: 137px;
  height: 31px;
  margin-left: -30px;
  cursor: pointer;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    width: 100%;
    height: 40px;
    margin-left: 0px;
    margin-top: 50px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
  }
`;

export const Home = styled.div`
  display: none;
  padding: 0px;

  h5 {
    color: #233d4d;
  }
  cursor: pointer;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const BurgerMenu = styled.div`
  position: absolute;
  display: none;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  right: 35px;
  top: 35px;
  padding: 4px 2px;
  gap: 5px;
  cursor: pointer;

  span {
    justify-content: flex-end;
    width: 25px;
    height: 2px;
    background: linear-gradient(
      90deg,
      #659e89 0%,
      #619b8a 32.12%,
      #a1c181 100%
    );
    transition: all 0.15s linear;
    transform-origin: 2.5px;
    &.burger {
      display: flex;
    }
    &.xmark {
      :first-child {
        transform: rotate(45deg);
      }

      :nth-child(2) {
        opacity: 0;
        transform: translateX(20px);
      }

      :nth-child(3) {
        transform: rotate(-45deg);
      }
    }
  }
  @media (max-width: 900px) {
    display: flex;
  }
`;

export const AddMobile = styled.div`
  display: none;
  @media (max-width: 900px) {
    width: 50px;
    display: flex;
    order: -1;

    &.showButton {
      display: flex;
    }
    &.hideButton {
      display: none;
    }
  }
  @media (max-width: 370px) {
    width: 30px;
  }
`;

export const ButtonLoggedin = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  background: #ffffff;
  border-radius: 60px;
  border: none;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;

  flex: none;
  cursor: pointer;

  div {
    height: 140%;
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    width: 100%;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

export const MobileLink = styled.div`
  display: none;
  padding: 0px;
  width: 100%;

  cursor: pointer;
  color: #233d4d;

  a {
    color: #233d4d;
  }

  span {
    color: #619b8a;
  }

  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const DesktopLink = styled.div`
  display: flex;
  padding: 0px;
  p {
    white-space: nowrap;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #233d4d;
    cursor: pointer;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;
