import styled from "styled-components";

//Backgorund
export const Container = styled.div`
  position: absolute;
  width: 110%;
  height: 500%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: -10%;

  @media (max-width: 900px) {
    width: 110%;
    margin-left: 1%;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  width: 550px;
  min-height: 230px;
  margin-left: 10vw;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  gap: 23px;

  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #ffff;

  z-index: 10;
  border-radius: 4px;

  form {
    width: 100%;
    gap: 16px;
  }
  h5 {
    margin-top: 10px;
    font-size: 14px;
    color: #ff7d26;
  }

  @media (max-width: 900px) {
    width: 80%;
    gap: 16px;
    height: auto;
    max-width: auto;
    margin: 10vh auto 0 auto;
  }

  @media (max-width: 300px) {
    width: 90%;
    height: auto;
    max-width: auto;
    margin: 85 vh 0 0 -20px;
  }
`;

export const ConfirmationWrapper = styled.div`
  position: relative;
  width: 550px;
  min-height: 170px;
  margin-left: 8vw;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  gap: 32px;

  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #ffff;

  z-index: 10;
  border-radius: 4px;
  button {
    width: 120px;
    height: 40px;
  }

  @media (max-width: 900px) {
    width: 70%;
    gap: 16px;
    margin-left: -5%;
    height: auto;
    max-width: auto;
    h5 {
      font-weight: 400;
      font-size: 24px;
    }
  }
`;

export const SettingsHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  text-align: left;
  width: 100%;
  gap: 32px;
  span {
    color: #619b8a;
  }
`;

export const SettingsForm = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const SettingsSection = styled.div`
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
  p {
    cursor: pointer;
    :nth-child(3) {
      color: red;
      align-self: flex-end;
    }
  }

  @media (max-width: 900px) {
    p {
      :nth-child(3) {
        margin-top: 30px;
      }
    }
  }
`;

export const TwoInRow = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  gap: 16px;
  button {
    padding: 12px 16px;
    width: 120px;
  }
  p {
    padding: 12px;
    margin: 0;
  }

  @media (max-width: 900px) {
    justify-content: space-between;
  }
`;

export const Warning = styled.div`
  color: #ff7d26;
  text-align: center;
  font-size: 12px;
  margin-top: -10px;
  width: 50%;

  @media (max-width: 900px) {
  }
`;
