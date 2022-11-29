import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  overflow-x: hidden;
  width: 100%;
  min-height: calc(100vh - 63px);

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start; //  flex-start | flex-end | center | space-between | space-around | space-evenly
  align-items: flex-start;
  justify-content: space-around;
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
  margin: 150px 0 0 30px;
  width: 70%;

  @media (max-width: 1600px) {
    width: 60%;
  }
  @media (max-width: 1150px) {
    width: 50%;
  }
  @media (max-width: 900px) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 23px;

    margin: 0;
    padding: 20px;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;

  @media (max-width: 900px) {
    gap: 16px;
  }
`;

export const Tittle = styled.div`
  position: relative;
  width: 100%;
  h4 {
    text-align: start;
    letter-spacing: 0.25px;
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
  @media (max-width: 900px) {
    padding: 0;
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

  button {
    align-self: flex-end;
    margin-top: 15px;
    width: 140px;
    height: 40px;
  }

  @media (max-width: 900px) {
    padding: 0;
  }
`;

export const Image = styled.div`
  position: relative;
  width: 70vw;
  height: 30vh;
  min-height: 300px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
  }

  @media (max-width: 1600px) {
    width: 60vw;
  }
  @media (max-width: 1150px) {
    width: 50vw;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const Map = styled.div`
  position: relative;
  height: 25vh;
  min-height: 250px;
  width: 100%;

  .map-container {
    height: 25vh;
    min-height: 250px;
    width: 100%;
    border-radius: 4px;
  }

  @media (max-width: 900px) {
  }
`;

export const GuessForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 30px;
  padding: 0px;
  gap: 30px;
  width: 100%;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const GuessFormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 100%;

  :nth-child(1) {
    width: 25%;
  }
  :nth-child(2) {
    width: 75%;
  }

  label {
    width: 100%;
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
  @media (max-width: 900px) {
    width: 100%;
    :nth-child(1) {
      width: 100%;
    }
    :nth-child(2) {
      width: 100%;
    }
  }
`;

export const Leaderboard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  justify-content: start;
  align-items: flex-start;
  align-content: flex-start;
  text-align: start;
  margin-top: 150px;
  padding: 10px;
  width: 20%;
  min-width: 420px;
  height: 80vh;
  min-height: 650px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    margin: 0;
    gap: 32px;
    height: 100%;
    min-height: 0;
    width: 100%;
    min-width: 280px;
  }
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  gap: 8px;

  .true {
    background: #619b8a;
    border-radius: 4px;
  }

  @media (max-width: 900px) {
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  width: 100%;

  :nth-child(1) {
    .rank {
      background: linear-gradient(41.75deg, #fe7f2d 22.78%, #fcca46 87.18%);
    }
  }
  :nth-child(2) {
    .rank {
      background: linear-gradient(41.75deg, #d8d8d8 22.78%, #999999 87.18%);
    }
  }
  :nth-child(3) {
    .rank {
      background: linear-gradient(41.75deg, #956956 22.78%, #d79376 87.18%);
    }
  }

  @media (max-width: 900px) {
  }
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;
`;

export const RightSide = styled.div`
  .true {
    color: #ffffff;
  }
`;

export const Rank = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 27px;
  height: 27px;
  background: #233d4d;
  border-radius: 30px;

  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    text-align: center;
    letter-spacing: 0.4px;
    color: #ffffff;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

export const Avatar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  border-radius: 64px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
`;

export const ProfileName = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
`;

export const GuessTime = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.4px;
`;

export const Distance = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: #619b8a;
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
