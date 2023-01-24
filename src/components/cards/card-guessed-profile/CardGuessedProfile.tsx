import {
  Container,
  Location,
  Image,
  Guess,
  Button,
  Overlay,
} from "./CardGuessedProfile.style";
import { useEffect, useState } from "react";
import { CardGuessedProps } from "../../../interfaces/LocationInterfaces";
import { Link } from "react-router-dom";
import { getLocationImage } from "../../../api/LocationApi";
import { getGuessesByLocationId } from "../../../api/GuessApi";
import { getSignedInUser } from "../../../api/UserApi";

const CardGuessedProfile: React.FC<CardGuessedProps> = ({ locationid }) => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const [image, setImage] = useState<string>();
  const [distance, setDistance] = useState<string>();
  const [userid, setUserId] = useState("");
  
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await getSignedInUser(JSON.parse(isLoggedIn));
        setUserId(response.id);
      })().catch((e) => {
        if (e.response.status === 401) {
          console.log("Unauthorized");
        } else {
          console.log("Error: Cant get user. \n" + e);
        }
      });
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
      (async () => {
        const response = await getGuessesByLocationId(
          locationid!,
          JSON.parse(isLoggedIn)
        );

        const allDistances = response.map((guess) => {
          if (guess.user.id === userid) {
            return guess.distance;
          } else return null;
        });
        const distance = allDistances.filter(val => val !== null).map(val => val);
        setDistance(distance[0]!.toString());
      })().catch((e) => {
        console.log("Error: Cant get location guesses. \n" + e);
      });
    }
  }, [isLoggedIn, locationid, userid]);

  return (
    <Container>
      <Location>
        <Image>
          <img src={`${image}`} alt="location" />
          <Overlay>
            <p>{distance} m</p>
          </Overlay>
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

export default CardGuessedProfile;
