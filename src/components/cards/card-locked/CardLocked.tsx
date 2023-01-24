import {
  Container,
  Location,
  Image,
  Overlay,
  LockedIcon,
} from "./CardLocked.style";
import { useContext, useEffect, useState } from "react";
import { UpdateContext } from "../../../utils/UpdateContext";
import { CardNewProps } from "../../../interfaces/LocationInterfaces";
import LockedIconImg from "../../../assets/icons/locked-icon.svg";
import { getLocationImage } from "../../../api/LocationApi";

// Recives user and quote data, displays it, and handles quote voting

const CardLocked: React.FC<CardNewProps> = ({ locationid }) => {
  const isLoggedIn = localStorage.getItem("accessToken");

  const [image, setImage] = useState<string>();
  const { updated } = useContext(UpdateContext);

  useEffect(() => {
    (async () => {
      const response = await getLocationImage(locationid!);
      const url = window.URL || window.webkitURL;
      const blobUrl = url.createObjectURL(response);
      setImage(blobUrl);
    })().catch((e) => {
      console.log("Error: Cant get location image. \n" + e);
    });
  }, [updated, isLoggedIn, locationid]);

  return (
    <Container>
      <Location>
        <Image>
          <img src={`${image}`} alt="location" />
          <Overlay>
            <LockedIcon style={{ backgroundImage: `url(${LockedIconImg})` }} />
          </Overlay>
        </Image>
      </Location>
    </Container>
  );
};

export default CardLocked;
