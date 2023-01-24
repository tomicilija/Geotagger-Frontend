import { useState, useEffect, useContext } from "react";
import {
  Container,
  Wrapper,
  HeroWrapper,
  BestGuesses,
  Tittle,
  HeroTittle,
  SloganWrapper,
  Slogan,
  Button,
  BgMap,
  LoadMore,
} from "./LandingPage.style";
import { Link } from "react-router-dom";
import { UpdateContext } from "../../utils/UpdateContext";
import { ReactComponent as BackgroundWorldMap } from "../../assets/background/background-world-map.svg";
import CardGrid from "../../components/card-grid/CardGrid";
import { getLocations, getRandomLocationsId } from "../../api/LocationApi";
import { getMyGuesses } from "../../api/GuessApi";

const LandingPage = () => {
  const isLoggedIn = localStorage.getItem("accessToken");

  const [newLocations, setNewLocations] = useState<string[]>([]);
  const [guessedLocations, setGuessedLocations] = useState<string[]>([]);
  const [lockedLocations, setlockedLocations] = useState<string[]>([]);
  const [userBestGuesses, setUserBestGuesses] = useState(false);
  const [userUploads, setUploads] = useState(false);
  const [locationsPage, setLocationsPage] = useState(1);
  const [locationsSize] = useState(3);
  const [guessesPage] = useState(1);
  const [guessesSize] = useState(3);

  const { updated, setUpdated } = useContext(UpdateContext);

  const loadNewLocations = () => {
    setLocationsPage(locationsPage + 1);
    setUpdated(!updated);
  };

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const locations = await getLocations(
          locationsPage,
          locationsSize,
          JSON.parse(isLoggedIn)
        );
        const locationsId = locations.map((object) => object.id);
        setNewLocations(locationsId);
        if (locations.length > 0) {
          setUploads(true);
        }
      })().catch((e) => {
        if (e.response.status === 401) {
          console.log("Unauthorized");
          localStorage.setItem("accessToken", "");
        } else {
          console.log("Error: Cant get location. \n" + e);
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
        if (locations.length > 0) {
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
    if (!isLoggedIn) {
    (async () => {
      const locations = await getRandomLocationsId();
      const locationsId = locations.map((object) => object.id);
      setlockedLocations(locationsId);
    })().catch((e) => {
      if (e.response.status === 401) {
        console.log("Unauthorized");
        localStorage.setItem("accessToken", "");
      } else {
        console.log("Error: Cant get location. \n" + e);
      }
    });}
  }, []);

  return (
    <Container>
      {isLoggedIn ? (
        <Wrapper>
          <BestGuesses>
            <Tittle>
              <h4>Personal best guesses</h4>
              <p>
                Your personal best guesses appear here. Go on and try to beat
                your personal records or set a new one!
              </p>
            </Tittle>
            {userBestGuesses ? (
              <CardGrid
                locationId={guessedLocations}
                cardStyle={"card-guessed"}
              />
            ) : (
              <p>
                Do you want to test your geography knowledge? Try guessing a
                location!
              </p>
            )}
          </BestGuesses>
          <BestGuesses>
            <Tittle>
              <h4>New locations</h4>
              <p>
                New uploads from users. Try to guess all the locations by
                pressing on a picture.
              </p>
            </Tittle>
            {userUploads ? (
              <>
                <CardGrid locationId={newLocations} cardStyle={"card-new"} />
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
      ) : (
        <>
          <HeroWrapper>
            <HeroTittle>
              <h2>Explore the world with Geotagger!</h2>
              <p>
                Geotagger is website that allows you to post picture and tag it
                on the map. Other user than try to locate it via Google Maps.
              </p>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button>Sign up</Button>
              </Link>
            </HeroTittle>
            <BgMap>
              <BackgroundWorldMap />
            </BgMap>
          </HeroWrapper>
          <SloganWrapper>
            <Slogan>
              <h4>Try yourself at Geotagger!</h4>
              <p>
                Try to guess the location of image by selecting position on the
                map. When you guess it, it gives you the error distance.
              </p>
            </Slogan>
          </SloganWrapper>
          <BestGuesses>
            <CardGrid locationId={lockedLocations} cardStyle={"card-locked"} />
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button>Sign up</Button>
            </Link>
          </BestGuesses>
        </>
      )}
    </Container>
  );
};

export default LandingPage;
