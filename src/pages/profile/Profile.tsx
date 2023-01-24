import { useState, useEffect, useContext } from "react";
import {
  Container,
  ProfileBanner,
  ProfilePicture,
  ProfileInfo,
  ProfileName,
  NotFound,
  Wrapper,
  BestGuesses,
  Tittle,
  LoadMore,
} from "./Profile.style";
import { Link } from "react-router-dom";
import { getSignedInUser, getUserProfilePicture } from "../../api/UserApi";
import { UpdateContext } from "../../utils/UpdateContext";
import { getMyLocations } from "../../api/LocationApi";
import CardGrid from "../../components/card-grid/CardGrid";
import { getMyGuesses } from "../../api/GuessApi";

const Profile = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const [userid, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [locationsPage, setLocationsPage] = useState(1);
  const [locationsSize] = useState(4);
  const [guessesPage, setGuessedPage] = useState(1);
  const [guessesSize] = useState(4);
  const [userBestGuesses, setUserBestGuesses] = useState(false);
  const [userUploads, setUploads] = useState(false);

  const [myLocations, setMyLocations] = useState<string[]>([]);
  const [guessedLocations, setGuessedLocations] = useState<string[]>([]);

  const [image, setImage] = useState<string>();

  const { updated, setUpdated } = useContext(UpdateContext);

  useEffect(() => {
    const mapsApiKey: string = process.env
      .API_URL as string;
    console.log(mapsApiKey);
    if (isLoggedIn) {
      (async () => {
        const response = await getSignedInUser(JSON.parse(isLoggedIn));
        setFirstName(response.name);
        setLastName(response.surname);
        setUserId(response.id);
      })().catch((e) => {
        if (e.response.status === 401) {
          console.log("Unauthorized");
          localStorage.setItem("accessToken", "");
        } else {
          console.log("Error: Cant get user. \n" + e);
        }
      });
      (async () => {
        const locations = await getMyLocations(
          locationsPage,
          locationsSize,
          JSON.parse(isLoggedIn)
        );
        const locationsId = locations.map((object) => object.id);
        setMyLocations(locationsId);
        if (locations.length > 1) {
          setUploads(true);
        }
      })().catch((e) => {
        if (e.response.status === 401) {
          console.log("Unauthorized");
          localStorage.setItem("accessToken", "");
        } else {
          console.log("Error: Cant get locations. \n" + e);
        }
      });
      (async () => {
        const locations = await getMyGuesses(
          guessesPage,
          guessesSize,
          JSON.parse(isLoggedIn)
        );
        const locationsId = locations.map((object) => object.location_id);
        setGuessedLocations(locationsId);
        if (locations.length > 1) {
          setUserBestGuesses(true);
        }
      })().catch((e) => {
        if (e.response.status === 401) {
          console.log("Unauthorized");
          localStorage.setItem("accessToken", "");
        } else {
          console.log("Error: Cant get guesses. \n" + e);
        }
      });
    }
  }, [updated, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await getUserProfilePicture(
          userid,
          JSON.parse(isLoggedIn)
        );
        const url = window.URL || window.webkitURL;
        const blobUrl = url.createObjectURL(response);
        setImage(blobUrl);
      })().catch((e) => {
        console.log("Error: Cant get user profile picture. \n" + e);
      });
    }
  }, [userid]);

  const loadNewLocations = () => {
    setLocationsPage(locationsPage + 1);
    setUpdated(!updated);
  };

  const loadMyGuesses = () => {
    setGuessedPage(guessesPage + 1);
    setUpdated(!updated);
  };

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <ProfileBanner>
            <ProfilePicture>
              <img src={`${image}`} alt="pp" />
            </ProfilePicture>
            <ProfileInfo>
              <ProfileName>
                <h4>
                  {firstName} {lastName}
                </h4>
              </ProfileName>
            </ProfileInfo>
          </ProfileBanner>
          <Wrapper>
            <BestGuesses>
              <Tittle>
                <h5>My best guesses</h5>
              </Tittle>
              {userBestGuesses ? (
                <>
                  <CardGrid
                    locationId={guessedLocations}
                    cardStyle={"card-guessed-profile"}
                  />
                  <LoadMore onClick={loadMyGuesses}>Load more</LoadMore>
                </>
              ) : (
                <p>
                  Do you want to test your geography knowledge? Try guessing a
                  location!
                </p>
              )}
            </BestGuesses>
            <BestGuesses>
              <Tittle>
                <h5>My uploads</h5>
              </Tittle>
              {userUploads ? (
                <>
                  <CardGrid locationId={myLocations} cardStyle={"card-edit"} />
                  <LoadMore onClick={loadNewLocations}>Load more</LoadMore>
                </>
              ) : (
                <p>
                  Do you have any photos of interesting loctions? Add a new
                  location!
                </p>
              )}
            </BestGuesses>
          </Wrapper>
        </>
      ) : (
        <NotFound>
          <h1>Error 402! Unauthorized</h1>
          <p>You are not logged in. Please log in to see your profile..</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            Go to homepage
          </Link>
        </NotFound>
      )}
    </Container>
  );
};

export default Profile;
