import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-left: 20px;
  margin-bottom: 20px;

  @media (max-width: 900px) {
    max-width: 100%;
    margin-left: 0px;
  }
`;

export const Location = styled.div`
  @media (max-width: 900px) {
    max-width: 80vw;
  }
`;

export const Image = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 237px;
  img {
    background: url(.jpg);
    width: 420px;
    height: 237px;
    object-fit: cover;
    border-radius: 4px;

    &:hover {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      transition: 0.5s ease;
      background-color: #008cba;
    }
  }
  @media (max-width: 900px) {
    max-width: 100%;
    img {
      max-width: 100%;
    }
  }
`;

export const Guess = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  opacity: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  transition: 0.8s ease;
  background-color: #669f89;
  border-radius: 4px;
  &:hover {
    opacity: 1;
  }
`;

export const Button = styled.button`
  display: flex;
  width: 130px;
  height: 40px;

  border: 1px solid #669f89;
  border-radius: 4px;
  background-color: #ffffff;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  color: #619b8a;

  cursor: pointer;

  @media (max-width: 900px) {
  }
`;
