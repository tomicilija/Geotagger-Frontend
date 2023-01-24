import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  overflow-y: hidden; // hide vertical scroll
  overflow-x: hidden; // hide horizontal scroll
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: calc(100vh - 63px);

  @media (max-width: 900px) {
    min-height: calc(100vh - 215px);
  }
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

  padding: 60px;
  width: 100%;
  margin-top: 130px;

  @media (max-width: 900px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 20px;
    padding: 0;

    margin-top: 30px;
  }
`;

export const HeroWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: flex-start;
  align-items: center;
  align-content: center;

  width: 100%;
  margin-top: 200px;

  @media (max-width: 900px) {
    margin-top: 20px;
  }
`;

export const BgMap = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  z-index: -5;
  width: 100%;
  top: -700px;
  svg {
    width: 80%;
  }
  @media (max-width: 900px) {
    position: relative;
    height: 100%;
    width: 100%;
    top: 0;
    padding: 10px;
    svg {
      height: 100%;
      width: 100%;
    }
  }
`;

export const BestGuesses = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 100px;

  p {
    margin-top: 50px;
  }

  @media (max-width: 900px) {
    margin-bottom: 0;
    :first-child {
      margin-bottom: 250px;
    }
    p {
      margin-top: 20px;
    }
  }
`;

export const Tittle = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  h4 {
    text-align: start;
    color: #619b8a;
    margin-bottom: 20px;
  }
  p {
    text-align: start;
  }
  @media (max-width: 900px) {
    width: 100%;
    padding: 30px;

    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 20px;

    h4 {
      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 34px;
      line-height: 40px;
      text-align: center;
      letter-spacing: 0.25px;
    }

    p {
      text-align: center;
    }
  }
`;

export const HeroTittle = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 30%;
  position: relative;
  gap: 32px;
  padding-left: 100px;

  h2 {
    letter-spacing: -0.5px;
    color: #619b8a;
  }

  @media (max-width: 900px) {
    width: 100%;
    padding: 30px;

    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 20px;

    h2 {
      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 34px;
      line-height: 40px;
      text-align: center;
      letter-spacing: 0.25px;
    }

    p {
      text-align: center;
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
  gap: 10px;
  width: 120px;
  height: 40px;
  margin-top: 20px;

  cursor: pointer;

  :hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const SloganWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 50px;

  @media (max-width: 900px) {
    margin: 20px;
  }
`;
export const Slogan = styled.div`
  position: relative;
  width: 620px;
  height: 150px;
  margin-top: 20px;
  text-align: center;

  h4 {
    letter-spacing: 0.25px;
    color: #619b8a;
    margin-bottom: 30px;
  }

  @media (max-width: 900px) {
    padding: 0;
    margin-top: 10px;
    width: 100%;

    h4 {
      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      text-align: center;
    }

    p {
      text-align: center;
    }
  }
`;

export const LoadMore = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 50px;

  width: 130px;
  height: 40px;

  border: 1px solid #669f89;
  border-radius: 4px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;

  color: #619b8a;

  cursor: pointer;

  :hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  }
`;
