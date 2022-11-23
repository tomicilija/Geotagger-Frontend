import { useState, useEffect, useContext } from "react";
import {
  Container,
  ProfileBanner,
  ProfilePicture,
  ProfileInfo,
  ProfileName,
  NotFound,
  Wrapper,
  MostUpvoated,
  Tittle,
} from "./Profile.style";
/*import Card from "../../components/card/Card";
import CardGrid from "../../components/card-grid/CardGrid";*/
import { Link, useParams } from "react-router-dom";
import { ReactComponent as DefaultProfileIcon } from "../../assets/icons/profile.svg";
/*import { getSignedInUser, getUserById, getUserVotes } from "../../api/UserApi";
import { getMyQuote, getUserQuote } from "../../api/QuoteApi";
import { UpdateContext } from "../../utils/UpdateContext";
import { QuoteResponse } from "../../interfaces/QuoteInterfaces";*/

// On profile page user quote, karma, and liked quotes is displayed

const Profile = () => {
  const isLoggedIn = true; //localStorage.getItem("accessToken");
  const [userid, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userQquote, setUserQquote] = useState("");
  const [userKarma, setUserKarma] = useState(0);
 // const [userVotes, setUserVotes] = useState<QuoteResponse[]>([]);
  const [userHasLikes, setUserHasLikes] = useState(false);
  const [showedQuotesDesktop, setShowedQuotesDesktop] = useState(9);
  const [showedQuotesMobile, setShowedQuotesMobile] = useState(4);
  const [isThreeCollumnSizeGrid, setIsThreeCollumnSizeGrid] = useState(window.innerWidth > 1340);
  //const { updated } = useContext(UpdateContext);
  const { id } = useParams();

  /*
   * Profile page shows profile of logged in user when clicked on profile icon in navbar
   * or profile of other usr when clicked on name on quote card
   * 
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

  const loadQuotesDesktop = () => {
    setShowedQuotesDesktop((prevValue) => prevValue + 9);
  };

  const loadQuotesMobile = () => {
    setShowedQuotesMobile((prevValue) => prevValue + 4);
  };
/*
  useEffect(() => {
    if (isLoggedIn) {
      if (id){
        (async () => {
          const response = await getUserById(id, JSON.parse(isLoggedIn));
          setFirstName(response.name);
          setLastName(response.surname);
          setUserId(response.id);
        })().catch((e) => {
          console.log("Error: Cant get user. \n" + e);
          window.location.href = "/";
        });
  
        (async () => {
          const response = await getUserQuote(id);
          setUserQquote(response.text);
          setUserKarma(response.karma);
        })().catch((e) => {
          console.log("Error! Cant get users quote. \n" + e);
        });
      } else{
        (async () => {
          const response = await getSignedInUser(JSON.parse(isLoggedIn));
          setFirstName(response.name);
          setLastName(response.surname);
          setUserId(response.id);
        })().catch((e) => {
          console.log("Error: Cant get user. \n" + e);
        });
  
        (async () => {
          const response = await getMyQuote(JSON.parse(isLoggedIn));
          setUserQquote(response.text);
          setUserKarma(response.karma);
        })().catch((e) => {
          console.log("Error! Cant get users quote. \n" + e);
        });
      }

      if (userid) {
        (async () => {
          const response = await getUserVotes(userid, JSON.parse(isLoggedIn));
          if (response) {
            setUserVotes(response);
            setUserHasLikes(true);
          } else {
            setUserHasLikes(false);
            console.log("User has no likes of other posts!");
          }
        })().catch((e) => {
          console.log("Error! Cant get users votes: " + e);
        });
      }
    }
  }, [id, userid, updated, isLoggedIn]);*/

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <ProfileBanner>
            <ProfilePicture>
                <DefaultProfileIcon />
            </ProfilePicture>
            <ProfileInfo>
              <ProfileName>
                <h4>Name Surname{firstName} {lastName}</h4>
              </ProfileName>
            </ProfileInfo>
          </ProfileBanner>
        <Wrapper>
          <MostUpvoated>
            <Tittle>
              <h5>My best guesses</h5>
            </Tittle>
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
              <h5>My uploads</h5>
            </Tittle>{/*
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
