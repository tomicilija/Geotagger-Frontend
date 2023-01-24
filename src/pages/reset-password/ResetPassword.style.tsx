import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 800px;
  height: 100vh;
  margin-bottom: -63px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 900px) {
    margin: -103px 0;
  }
`;

export const Background = styled.div`
  z-index: -3;
  background: no-repeat;
  background-size: cover;
  background-position: center;
  margin: 0px;
  width: 50%;
  @media (max-width: 1300px) {
    padding-top: 20vh;
    padding-bottom: 20vh;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

export const BackgroundIcon = styled.div`
  z-index: -2;
  background: no-repeat;
  background-size: cover;
  padding-top: 90%;
  padding-bottom: 55%;
  width: 100%;
  transform: scale(0.2);
  @media (max-width: 900px) {
    display: none;
  }
`;

export const SignUpFormWrapper = styled.div`
  position: relative;
  width: 50%;
  //min-height: 750px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  //margin: 100px;

  gap: 16px;

  @media (max-width: 900px) {
    height: 600px;
    width: 100%;
    padding: 0 15px;
    max-width: 420px;
  }
`;

export const SignUpHeader = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  h3 {
    margin-bottom: 10px;
  }
  h5 {
    margin-top: 10px;
    font-size: 14px;
    color: #ff7d26;
  }
`;

export const SignUpForm = styled.div`
  position: relative;
  width: 420px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  @media (max-width: 900px) {
    width: 80vw;
  }
`;

export const SignUpFormSection = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  label {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: 0px 8px 0px 0px;
    gap: 10px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #233d4d;
  }

  input {
    display: flex;
    width: 100%;
    height: 40px;
    flex-direction: row;
    align-items: center;
    padding: 8px 0 8px 0;
    gap: 8px;

    background: #ffffff;
    border: none;
    outline: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);

    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 14px;
    color: #322d38;
    :focus {
      border-bottom: 2px solid #000000;
    }
  }

  button {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;

    cursor: pointer;
  }

  a {
    width: 100%;
  }
`;

export const Peek = styled.button`
  position: absolute;
  justify-content: flex-end !important;
  align-self: flex-end !important;
  margin-top: 20px;
  width: 25% !important;
  height: 25px;
  background-color: transparent;
  cursor: default;

  @media (max-width: 900px) {
  }
`;

export const PeekImg = styled.div`
  position: relative;
  background: no-repeat;
  width: 23px;
  height: 16px;
  cursor: pointer;

  &.seen {
    opacity: 100%;
  }
  &.hidden {
    opacity: 30%;
  }
`;

export const Warning = styled.div`
  color: #ff7d26;
  text-align: left;
  font-size: 12px;
  margin-top: -10px;

  @media (max-width: 900px) {
  }
`;
