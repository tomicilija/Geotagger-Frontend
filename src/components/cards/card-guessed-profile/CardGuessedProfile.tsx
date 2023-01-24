import {
  Container,
  Location,
  Image,
  Guess,
  Button,
  Overlay,
} from "./CardGuessedProfile.style";
import { useEffect, useState, useCallback } from "react";
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

  const getData = useCallback(async () => {
    if (isLoggedIn) {
      const [user, location, guesses] = await Promise.all([
        getSignedInUser(JSON.parse(isLoggedIn)),
        getLocationImage(locationid!),
        getGuessesByLocationId(locationid!, JSON.parse(isLoggedIn)),
      ]);
      setUserId(user.id);
      const url = window.URL || window.webkitURL;
      const blobUrl = url.createObjectURL(location);
      setImage(blobUrl);
      const allDistances = guesses.map((guess) => {
        if (guess.user.id === userid) {
          return guess.distance;
        } else return null;
      });
      const distance = allDistances
        .filter((val) => val !== null)
        .map((val) => val);
      if (distance[0]) {
        setDistance(distance[0]!.toString());
      }
    }
  }, [isLoggedIn, locationid, userid]);

  useEffect(() => {
    getData().catch((e) => {
      console.log("Error: Cant get data. \n" + e);
    });
  }, [isLoggedIn, userid, getData]);


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
