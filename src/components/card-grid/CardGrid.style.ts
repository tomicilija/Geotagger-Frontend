import styled from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;

  position: relative;
  top: 15%;

  .my-masonry-grid {
    display: flex;
    width: auto;
  }
  .horizontal {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    @media (max-width: 700px) {
      position: absolute;
      overflow-x: scroll;
      display: flex;
      flex-wrap: nowrap;
      justify-content: start;
      align-items: flex-start;
      align-content: flex-start;
      margin-top: -30px;
      margin-left: 20px;
      width: 90vw;
    }
  }

  .horizontal > div {
    width: 33.3333%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    @media (max-width: 1440px) {
      width: 50%;
    }
    @media (max-width: 1000px) {
      width: 100%;
    }
  }

  @media (max-width: 900px) {
    margin-top: 20px;
    align-items: center;
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
  h1 {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 41px;
    letter-spacing: 0.25px;
    text-align: center;
    margin: 30px 0 10px 0;
    color: #e59967;
  }
  p {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #000000;
  }
`;
