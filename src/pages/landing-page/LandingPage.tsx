import { useState, useEffect, useContext } from "react";
import {
  Container,
  Wrapper,
  HeroWrapper,
  MostUpvoated,
  Tittle,
  HeroTittle,
  SloganWrapper,
  Slogan,
  Button,
  BgMap,
  LoadMore,
} from "./LandingPage.style";
import { Link } from "react-router-dom";
//import { getMostUpvoatedQuotes, getMostRecentQuotes } from "../../api/QuoteApi";
import { UpdateContext } from "../../utils/UpdateContext";
//import { QuoteResponse } from "../../interfaces/QuoteInterfaces";
import { ReactComponent as BackgroundWorldMap } from "../../assets/background/background-world-map.svg";
import CardNew from "../../components/cards/card-new/CardNew";
import LocationImg from "../../assets/s6L0uQyprpE.png";
import CardGuessed from "../../components/cards/card-guessed/CardGuessed";
import CardLocked from "../../components/cards/card-locked/CardLocked";
import CardGrid from "../../components/card-grid/CardGrid";
import { LocationResponse } from "../../interfaces/LocationInterfaces";
import { getLocations } from "../../api/LocationApi";
import { getMyGuesses } from "../../api/GuessApi";
import { setuid } from "process";

// One version of landing page can be shown to anyone, logged in user sees different version, same for mobile users

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("accessToken")
  );

  const [newLocations, setNewLocations] = useState<string[]>([]);
  const [guessedLocations, setGuessedLocations] = useState<string[]>([]);
  const [locationsPage, setLocationsPage] = useState(1);
  const [locationsSize] = useState(3);
  const [guessesPage, setGuessedPage] = useState(1);
  const [guessesSize] = useState(3);

  const { updated, setUpdated } = useContext(UpdateContext);

  /*
   * Quote cards can be shown in grid of 3, 2, or 1 columns, depending on screen width
   * 3 column grid shows max of 9 cards and lods by 9 cards
   * 2 and 1 column shows max of 4 cards, and loads by 4 cards
   */


  const loadNewLocations = () => {
    setLocationsPage(locationsPage + 1);
    setUpdated(!updated);
  };

  const loadMyGuesses = () => {
    setGuessedPage(guessesPage + 1);
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
      })().catch((e) => {
        if (e.response.status === 401) {
          console.log("Unauthorized");
          setIsLoggedIn(null);
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
      })().catch((e) => {
        if (e.response.status === 401) {
          console.log("Unauthorized");
          setIsLoggedIn(null);
        } else {
          console.log("Error: Cant get guesses. \n" + e);
        }
      });
    }
  }, [updated, isLoggedIn]);

  return (
    <Container>
      {isLoggedIn ? (
        <Wrapper>
          <MostUpvoated>
            <Tittle>
              <h4>Personal best guesses</h4>
              <p>
                Your personal best guesses appear here. Go on and try to beat
                your personal records or set a new one!
              </p>
            </Tittle>
            <CardGrid
              locationId={guessedLocations}
              cardStyle={"card-guessed"}
            />
            {/* <LoadMore onClick={loadMyGuesses}>Load more</LoadMore> */}
          </MostUpvoated>
          <MostUpvoated>
            <Tittle>
              <h4>New locations</h4>
              <p>
                New uploads from users. Try to guess all the locations by
                pressing on a picture.
              </p>
            </Tittle>
            <CardGrid locationId={newLocations} cardStyle={"card-new"} />
            <LoadMore onClick={loadNewLocations}>Load more</LoadMore>
          </MostUpvoated>
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
          <MostUpvoated>
            <CardGrid locationId={newLocations} cardStyle={"card-locked"} />
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button>Sign up</Button>
            </Link>
          </MostUpvoated>
        </>
      )}
    </Container>
  );
};

export default LandingPage;
