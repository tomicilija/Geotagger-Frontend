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
  margin-top: 200px;
  padding: 50px;
  width: 100%;

  @media (max-width: 900px) {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;

    margin: 0;
    padding: 30px;
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
  width: 100%;
  padding: 20px;

  p {
    margin-top: 25px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #000000;

    opacity: 0.7;
  }
  @media (max-width: 900px) {
  }
`;

export const MapLocation = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;

  width: 100%;
  padding: 20px;

  label {
    width: 100%;
    margin-top: 20px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #000000;

    text-align: start;
  }

  input {
    width: 100%;
    height: 50px;
    margin-top: 15px;
    padding: 10px;

    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 4px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #000000;

    text-align: start;
  }

  button {
    align-self: flex-end;
    margin-top: 15px;
    width: 140px;
    height: 40px;
  }

  @media (max-width: 900px) {
  }
`;

export const Image = styled.div`
  position: relative;
  width: 60vw;
  height: 350px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 900px) {
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
  }
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: flex-start;

  padding: 8px 16px;
  width: 200px;
  height: 40px;
  margin: 20px 0 0 0;

  cursor: pointer;

  :hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const Icon = styled.div`
  position: relative;
  background: no-repeat;
  background-size: cover;
  display: flex;
  width: 15px;
  height: 15px;
`;

export const Map = styled.div`
  position: relative;
  height: 200px;
  width: 100%;

  .map-container {
    height: 300px;
    width: 100%;
  }

  @media (max-width: 900px) {
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
