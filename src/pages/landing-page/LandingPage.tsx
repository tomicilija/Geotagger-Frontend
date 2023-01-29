import { useState, useEffect, useContext, useCallback } from "react";
import {
  Container,
  Wrapper,
  HeroWrapper,
  BestGuesses,
  Tittle,
  HeroTittle,
  SloganWrapper,
  Slogan,
  //Button,
  BgMap,
  LoadMore,
} from "./LandingPage.style";
import { Link } from "react-router-dom";
import { UpdateContext } from "../../utils/UpdateContext";
import { ReactComponent as BackgroundWorldMap } from "../../assets/background/background-world-map.svg";
import CardGrid from "../../components/card-grid/CardGrid";
import { getLocations, getRandomLocationsId } from "../../api/LocationApi";
import { getMyGuesses } from "../../api/GuessApi";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

const LandingPage = () => {
  const isLoggedIn = localStorage.getItem("accessToken");

  const [newLocations, setNewLocations] = useState<string[]>([]);
  const [guessedLocations, setGuessedLocations] = useState<string[]>([]);
  const [lockedLocations, setlockedLocations] = useState<string[]>([]);
  const [userBestGuesses, setUserBestGuesses] = useState(false);
  const [userUploads, setUserUploads] = useState(false);
  const [locationsPage, setLocationsPage] = useState(1);
  const [locationsSize] = useState(3);
  const [guessesPage] = useState(1);
  const [guessesSize] = useState(3);

  const { updated, setUpdated } = useContext(UpdateContext);

  const loadNewLocations = () => {
    setLocationsPage(locationsPage + 1);
    setUpdated(!updated);
  };

  const getLandingData = useCallback(async () => {
    const locations = await getRandomLocationsId();
    const locationsId = locations.map((object) => object.id);
    setlockedLocations(locationsId);
  }, []);

  const getLoggedInData = useCallback(async () => {
    if (isLoggedIn) {
      const [locations, guesses] = await Promise.all([
        getLocations(locationsPage, locationsSize, JSON.parse(isLoggedIn)),
        getMyGuesses(guessesPage, guessesSize, JSON.parse(isLoggedIn)),
      ]);
      const locationsId = locations.map((object) => object.id);
      setNewLocations(locationsId);
      if (locations.length > 0) {
        setUserUploads(true);
      }

      const guessesId = guesses.map((object) => object.location_id);
      setGuessedLocations(guessesId);
      if (guesses.length > 0) {
        setUserBestGuesses(true);
      }
    }
  }, [guessesPage, guessesSize, isLoggedIn, locationsPage, locationsSize]);

  useEffect(() => {
    getLandingData().catch((e) => {
      console.log("Error: Cant get data. \n" + e);
    });
    getLoggedInData().catch((e) => {
      console.log("Error: Cant get data. \n" + e);
    });
  }, [updated, isLoggedIn, getLoggedInData, getLandingData]);

  // MUI
  const theme = createTheme({
    palette: {
      primary: {
        main: "#619b8a",
      },
    },
    typography: {
      h2: { color: "#619b8a" },
    },
  });

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
          <ThemeProvider theme={theme}>
            <HeroWrapper>
              <HeroTittle>
                <Typography variant="h2">
                  Explore the world with Geotagger!
                </Typography>
                <Typography>
                  Geotagger is website that allows you to post picture and tag
                  it on the map. Other user than try to locate it via Google
                  Maps.
                </Typography>
                {/* <h2>Explore the world with Geotagger!</h2>
              <p>
                Geotagger is website that allows you to post picture and tag it
                on the map. Other user than try to locate it via Google Maps.
              </p> */}
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button variant="contained">Sign up</Button>
                </Link>
              </HeroTittle>
              <BgMap>
                <BackgroundWorldMap />
              </BgMap>
            </HeroWrapper>
            <SloganWrapper>
              <Slogan>
                <Typography variant="h2">Try yourself at Geotagger!</Typography>
                <Typography>
                  Try to guess the location of image by selecting position on
                  the map. When you guess it, it gives you the error distance.
                </Typography>
                {/* <h4>Try yourself at Geotagger!</h4>
              <p>
                Try to guess the location of image by selecting position on the
                map. When you guess it, it gives you the error distance.
              </p> */}
              </Slogan>
            </SloganWrapper>
            <BestGuesses>
              <CardGrid
                locationId={lockedLocations}
                cardStyle={"card-locked"}
              />
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button variant="contained">Sign up</Button>
              </Link>
            </BestGuesses>
          </ThemeProvider>
        </>
      )}
    </Container>
  );
};

export default LandingPage;
