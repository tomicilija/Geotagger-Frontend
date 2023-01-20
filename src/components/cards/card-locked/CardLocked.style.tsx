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
    height: 237px;
    object-fit: cover;
    border-radius: 4px;
  }
  @media (max-width: 900px) {
      max-width: 100%;
    img {
      max-width: 100%;
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(102, 159, 137, 0.6) 50%,
    rgba(159, 193, 129, 0.6) 128%
  );
  border-radius: 4px;
`;

export const LockedIcon = styled.div`
  position: absolute;
  background: no-repeat;
  display: flex;
  width: 48px;
  height: 48px;
`;
