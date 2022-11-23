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
} from "./LandingPage.style";
//import Card from "../../components/card/Card";
//import CardGrid from "../../components/card-grid/CardGrid";
import { Link } from "react-router-dom";
//import { getMostUpvoatedQuotes, getMostRecentQuotes } from "../../api/QuoteApi";
import { UpdateContext } from "../../utils/UpdateContext";
//import { QuoteResponse } from "../../interfaces/QuoteInterfaces";
import { ReactComponent as BackgroundWorldMap } from "../../assets/background/background-world-map.svg";
import CardNew from "../../components/cards/card-new/CardNew";
import LocationImg from "../../assets/s6L0uQyprpE.png";
import CardGuessed from "../../components/cards/card-guessed/CardGuessed";
import CardLocked from "../../components/cards/card-locked/CardLocked";

// One version of landing page can be shown to anyone, logged in user sees different version, same for mobile users

const quote = {
  userid: "",
  karma: 0,
  text: "",
  name: "",
  surname: "",
};

const LandingPage = () => {
  const isLoggedIn = true; //localStorage.getItem("accessToken");
  /*
  const [mostLikedQuotes, setMostLikedQuotes] = useState<QuoteResponse[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<QuoteResponse[]>([]);
  const [randomQuote, setRandomQuote] = useState<QuoteResponse>(quote);
  const [heroQuote1, setHeroQuote1] = useState<QuoteResponse>(quote);
  const [heroQuote2, setHeroQuote2] = useState<QuoteResponse>(quote);
  const [heroQuote3, setHeroQuote3] = useState<QuoteResponse>(quote);*/
  const [showedLikedQuotesDesktop, setShowedLikedQuotesDesktop] = useState(9);
  const [showedRecentQuotesDesktop, setShowedRecentQuotesDesktop] = useState(9);
  const [showedLikedQuotesMobile, setShowedLikedQuotesMobile] = useState(4);
  const [showedRecentQuotesMobile, setShowedRecentQuotesMobile] = useState(4);
  const [isThreeCollumnSizeGrid, setIsThreeCollumnSizeGrid] = useState(
    window.innerWidth > 1340
  );
  const { updated } = useContext(UpdateContext);

  /*
   * Quote cards can be shown in grid of 3, 2, or 1 columns, depending on screen width
   * 3 column grid shows max of 9 cards and lods by 9 cards
   * 2 and 1 column shows max of 4 cards, and loads by 4 cards
   */

  const updateScreenSize = () => {
    setIsThreeCollumnSizeGrid(window.innerWidth > 1340);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  });

  const loadLikedQuotesDesktop = () => {
    setShowedLikedQuotesDesktop((prevValue) => prevValue + 9);
  };

  const loadLikedQuotesMobile = () => {
    setShowedLikedQuotesMobile((prevValue) => prevValue + 4);
  };

  const loadRecentQuotesDesktop = () => {
    setShowedRecentQuotesDesktop((prevValue) => prevValue + 9);
  };

  const loadRecentQuotesMobile = () => {
    setShowedRecentQuotesMobile((prevValue) => prevValue + 4);
  };
  /*
  useEffect(() => {
    (async () => {
      const quotes = await getMostUpvoatedQuotes();
      setHeroQuote1(quotes[0]);
      setHeroQuote2(quotes[1]);
      setHeroQuote3(quotes[2]);
      setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const quotes = await getMostUpvoatedQuotes();
      setMostLikedQuotes(quotes);
    })();
    if (isLoggedIn) {
      (async () => {
        const quotes = await getMostRecentQuotes(JSON.parse(isLoggedIn));
        setRecentQuotes(quotes);
      })();
    }
  }, [updated, isLoggedIn]);
*/
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

            <CardGuessed
              locationid={"1"}
              image={`${LocationImg}`}
              distance={255}
            />

            {/*
            {isThreeCollumnSizeGrid ? (
              <>
                <CardGrid
                  quotes={mostLikedQuotes.slice(0, showedLikedQuotesDesktop)}
                />
                <SeeMore onClick={loadLikedQuotesDesktop}>Load more</SeeMore>
              </>
            ) : (
              <>
                <CardGrid
                  quotes={mostLikedQuotes.slice(0, showedLikedQuotesMobile)}
                />
                <SeeMore onClick={loadLikedQuotesMobile}>Load more</SeeMore>
              </>
            )}*/}
          </MostUpvoated>
          <MostUpvoated>
            <Tittle>
              <h4>New locations</h4>
              <p>
                New uploads from users. Try to guess all the locations by
                pressing on a picture.
              </p>
            </Tittle>

            <CardNew locationid={"1"} image={`${LocationImg}`} />

            {/*
            {isThreeCollumnSizeGrid ? (
              <>
                <CardGrid
                  quotes={recentQuotes.slice(0, showedRecentQuotesDesktop)}
                />
                <SeeMore onClick={loadRecentQuotesDesktop}>Load more</SeeMore>
              </>
            ) : (
              <>
                <CardGrid
                  quotes={recentQuotes.slice(0, showedRecentQuotesMobile)}
                />
                <SeeMore onClick={loadRecentQuotesMobile}>Load more</SeeMore>
              </>
            )}*/}
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
          <Wrapper>
            <MostUpvoated>
              <CardLocked image={`${LocationImg}`} />

              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button>Sign up</Button>
              </Link>
            </MostUpvoated>
          </Wrapper>
        </>
      )}
    </Container>
  );
};

export default LandingPage;
