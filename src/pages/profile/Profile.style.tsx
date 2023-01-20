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

  justify-content: flex-start; //  flex-start | flex-end | center | space-between | space-around | space-evenly
  align-items: flex-start; //  stretch | flex-start | flex-end | center | baseline | first baseline | last baseline
  align-content: flex-start; //  flex-start | flex-end | center | space-between | space-around | space-evenly | stretch
  text-align: start;

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

export const MostUpvoated = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 100px;

  @media (max-width: 900px) {
    margin-bottom: 0;
  }
`;

export const Tittle = styled.div`
  position: relative;
  width: 100%;
  h5 {
    text-align: start;
    color: #233d4d;
    margin-bottom: 20px;
  }
  p {
    text-align: start;
  }
  @media (max-width: 900px) {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    h5 {
      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      color: #619b8a;
    }
  }
`;

export const ProfileBanner = styled.div`
  position: relative;
  width: 100%;
  margin-top: 120px;
  padding: 50px;
  gap: 24px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: flex-start;
  align-items: center;
  align-content: center;
  text-align: center;

  @media (max-width: 900px) {
    margin-top: 20px;
    padding: 30px;
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;

  background: #ffffff;
  border-radius: 64px;
  border: none;
  img {
    height: 70px;
    width: 70px;
    border-radius: 64px;
    object-fit: cover;
  }
  @media (max-width: 900px) {
    height: 60px;
    width: 60px;
    img {
      height: 60px;
      width: 60px;
    }
  }
`;

export const ProfileInfo = styled.div`
  gap: 24px;
  @media (max-width: 900px) {
  }
`;

export const ProfileName = styled.div`
  letter-spacing: 0.25px;
  @media (max-width: 900px) {
    h4 {
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
    }
  }
`;

export const Quote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 32px;
  gap: 10px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;

  color: #de8667;
  p {
    font-size: 15px;
    color: black;
  }
  span {
    color: #de8667;
  }

  @media (max-width: 900px) {
  }
`;

export const Likes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 32px;

  h3 {
    width: 100%;
    align-items: flex-start;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
  }

  p {
    margin: 10px;
    font-size: 15px;
    color: black;
  }
  span {
    color: #de8667;
  }
  @media (max-width: 900px) {
    padding: 0 0 0 10px;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  position: relative;

  .my-masonry-grid {
    display: flex;
    width: auto;
  }

  @media (max-width: 900px) {
  }
`;

export const SeeMore = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 50px;

  width: 200px;
  height: 40px;

  background: #ffffff;
  /* Orange */

  border: 2px solid #de8667;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 32px;

  /* P desktop */

  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  text-align: center;

  /* Orange */

  color: #de8667;
  cursor: pointer;

  :hover {
    border-bottom: 5px solid #e59967;
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
  h1 {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 35px;
    line-height: 41px;
    letter-spacing: 0.25px;
    text-align: center;
    margin: 20px;
    color: #e59967;
  }
  p {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    margin: 20px;
    color: #000000;
  }
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
    h1 {
      font-family: "Raleway";
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      text-align: center;
      color: #e59967;
    }
    p {
      width: 300px;
      font-family: "Raleway";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
    }
  }
`;
