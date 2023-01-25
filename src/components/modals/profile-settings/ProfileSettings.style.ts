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
    margin-left: -13%;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  width: 600px;
  min-height: 500px;
  margin-top: 80vh;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  gap: 32px;

  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #ffff;

  z-index: 10;
  border-radius: 4px;

  form {
    width: 100%;
    gap: 16px;
  }

  @media (max-width: 900px) {
    width: 80%;
    gap: 16px;
    height: auto;
    max-width: auto;
    margin: 80vh auto 0 auto;
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
  width: 600px;
  min-height: 200px;
  margin-top: 80vh;

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
    width: 80%;
    gap: 16px;
    height: auto;
    max-width: auto;
    h4 {
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
  h5 {
    color: #ff7d26;
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

export const ChangeSetings = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  padding: 0px;
  gap: 16px;
  margin: 20px 0 20px 0;
  button {
    letter-spacing: 0.6px;
    padding: 12px 16px;
    width: 100%;
    text-transform: capitalize;
    :nth-child(1) {
      background: #233d4d;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const UploadImage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 30px;
  width: 100%;
  @media (max-width: 900px) {
    padding: 0;
  }
`;

export const Image = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 64px;
  }
  @media (max-width: 900px) {
  }
`;

export const Buttons = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  align-self: flex-end;
  width: 100%;
  gap: 20px;
  @media (max-width: 900px) {
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

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: flex-start;

  padding: 8px 16px;
  width: 100%;
  height: 40px;
  cursor: pointer;

  :hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 900px) {
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
