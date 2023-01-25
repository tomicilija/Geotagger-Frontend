import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  overflow-x: hidden;
  width: 100%;
  min-height: calc(100vh - 63px);

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start; //  flex-start | flex-end | center | space-between | space-around | space-evenly
  align-items: center;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column; //  row | row-reverse | column | column-reverse;
  flex-wrap: wrap; //  nowrap | wrap | wrap-reverse

  justify-content: center; //  flex-start | flex-end | center | space-between | space-around | space-evenly
  align-items: center; //  stretch | flex-start | flex-end | center | baseline | first baseline | last baseline
  align-content: center; //  flex-start | flex-end | center | space-between | space-around | space-evenly | stretch
  text-align: start;
  margin-top: 150px;
  gap: 32px;
  width: 100%;

  @media (max-width: 900px) {
    margin-top: 10px;
    padding: 30px;
    gap: 32px;
  }
`;

export const Tittle = styled.div`
  position: relative;
  width: 100%;
  h4 {
    text-align: center;
    letter-spacing: 0.25px;
  }
  p {
    text-align: start;
  }
  span {
    color: #619b8a;
  }
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    h4 {
    }
  }
`;

export const UploadImage = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  gap: 23px;

  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #000000;

    opacity: 0.7;
  }
  @media (max-width: 900px) {
    padding: 0;
  }
`;

export const Image = styled.div`
  position: relative;
  width: 60vw;
  height: 35vh;
  min-height: 350px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
  }
  @media (max-width: 900px) {
    width: 100%;
    min-height: 200px;
  }
`;

export const Buttons = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  align-self: flex-end;
  width: 100%;
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 20px;
    button {
      :nth-child(1) {
        width: 130px;
        padding: 0;
      }
      :nth-child(2) {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 40px;
        background: #ffffff;

        font-family: "Roboto";
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        color: #233d4d;
        text-transform: capitalize;

        cursor: pointer;
      }
    }
  }
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 23px;
    div{
    justify-content: space-between;
    }
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
`;

export const NotFound = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex-direction: column;
  width: 100%;
  height: 60vh;
  h3 {
    letter-spacing: 0.25px;
    text-align: center;
    margin: 20px;
  }
  p {
    text-align: center;
    margin: 20px;
  }
  span {
    color: #619b8a;
  }
  a {
    color: #619b8a;
  }
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
    h1 {
      text-align: center;
      color: #619b8a;
    }
    p {
      width: 300px;
      text-align: center;
    }
  }
`;

export const Warning = styled.div`
  color: #ff7d26;
  text-align: center;
  font-size: 12px;
  margin-top: 10px;

  @media (max-width: 900px) {
  }
`;
