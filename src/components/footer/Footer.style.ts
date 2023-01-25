import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  justify-content: space-between;
  align-content: flex-end;
  align-items: flex-end;
  padding: 20px 70px;
  width: 100%;

  background: #619b8a;
  border-radius: 0px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    margin-top: 50px;

    height: 65px;
  }
`;

export const LogoText = styled.div`
  display: flex;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const LogoIcon = styled.div`
  display: none;
  width: 33px;
  height: 25px;

  @media (max-width: 900px) {
    display: flex;
    margin-left: 20px;
  }
`;

export const Rights = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: right;

  color: #ffffff;

  a {
    color: #ffffff;
    text-decoration: none;

    &:hover {
      color: #ffffff;
      text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
    }
  }

  @media (max-width: 900px) {
    width: 230px;
    display: flex;
    flex-direction: row;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    text-align: right;
  }
`;
