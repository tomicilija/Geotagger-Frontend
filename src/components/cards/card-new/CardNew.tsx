import { Container, Location, Image, Guess, Button } from "./CardNew.style";
import { useContext, useEffect, useState } from "react";
import { UpdateContext } from "../../../utils/UpdateContext";
import { CardNewProps } from "../../../interfaces/LocationInterfaces";
import { Link } from "react-router-dom";
import { getLocationImage } from "../../../api/LocationApi";

const CardNew: React.FC<CardNewProps> = ({ locationid }) => {
  const isLoggedIn = localStorage.getItem("accessToken");

  const [image, setImage] = useState<string>();
  const { updated } = useContext(UpdateContext);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await getLocationImage(
          locationid!
        );
        const url = window.URL || window.webkitURL;
        const blobUrl = url.createObjectURL(response);
        setImage(blobUrl);
      })().catch((e) => {
        console.log("Error: Cant get location image. \n" + e);
      });
    }
  }, [updated, isLoggedIn, locationid]);

  return (
    <Container>
      <Location>
        <Image>
          <img src={`${image}`} alt="location" />
          <Link
            to={`/location/${locationid}`}
            style={{ textDecoration: "none" }}
          >
            <Guess>
              <Button>Guess</Button>
            </Guess>
          </Link>
        </Image>
      </Location>
    </Container>
  );
};

export default CardNew;
