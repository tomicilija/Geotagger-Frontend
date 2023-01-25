import { useState, useEffect, useContext, useCallback } from "react";
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
import { UpdateContext } from "../../utils/UpdateContext";
import { getSignedInUser, getUserProfilePicture } from "../../api/UserApi";
import { getMyLocations } from "../../api/LocationApi";
import { getMyGuesses } from "../../api/GuessApi";
import CardGrid from "../../components/card-grid/CardGrid";

const Profile = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
  });
  const [locationsPage, setLocationsPage] = useState(1);
  const [locationsSize] = useState(4);
  const [guessesPage, setGuessedPage] = useState(1);
  const [guessesSize] = useState(4);
  const [userBestGuesses, setUserBestGuesses] = useState(false);
  const [userUploads, setUserUploads] = useState(false);
  const [myLocations, setMyLocations] = useState<string[]>([]);
  const [guessedLocations, setGuessedLocations] = useState<string[]>([]);
  const [image, setImage] = useState<string>();
  const { updated, setUpdated } = useContext(UpdateContext);

  const getData = useCallback(async () => {
    if (isLoggedIn) {
      const [user, profilePicture, locations, guesses] = await Promise.all([
        getSignedInUser(JSON.parse(isLoggedIn)),
        getUserProfilePicture(userData.id, JSON.parse(isLoggedIn)),
        getMyLocations(locationsPage, locationsSize, JSON.parse(isLoggedIn)),
        getMyGuesses(guessesPage, guessesSize, JSON.parse(isLoggedIn)),
      ]);
      setUserData({
        id: user.id,
        firstName: user.name,
        lastName: user.surname,
      });

      const url = window.URL || window.webkitURL;
      const blobUrl = url.createObjectURL(profilePicture);
      setImage(blobUrl);

      const locationsId = locations.map((object) => object.id);
      setMyLocations(locationsId);
      if (locations.length > 0) {
        setUserUploads(true);
      }

      const guessesId = guesses.map((object) => object.location_id);
      setGuessedLocations(guessesId);
      if (guesses.length > 0) {
        setUserBestGuesses(true);
      }
    }
  }, [guessesPage, guessesSize, isLoggedIn, locationsPage, locationsSize, userData.id]);

  useEffect(() => {
    getData().catch((e) => {
      console.log("Error: Cant get data. \n" + e);
    });
  }, [updated, isLoggedIn, getData]);

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
                  {userData.firstName} {userData.lastName}
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
