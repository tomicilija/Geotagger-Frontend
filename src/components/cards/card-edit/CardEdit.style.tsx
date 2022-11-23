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
    min-height: 100%;
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
  img {
    background: url(.jpg);
    width: 420px;
    border-radius: 4px;
  }
  @media (max-width: 900px) {
    max-width: 100%;
    img {
      max-width: 100%;
    }
  }
`;
export const Edit = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  border-radius: 4px;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  margin: 15px;
  padding: 8px;

  border: 0;
  border-radius: 4px;
  background-color: #619b8a;
  cursor: pointer;

  :nth-child(2) {
    background-color: #9B6161;
  }

  @media (max-width: 900px) {
  }
`;

export const Icon = styled.div`
  position: relative;
  background: no-repeat;
  background-size: cover;
  display: flex;
  width: 20px;
  height: 20px;
`;
