import { Container, Location, Image, Guess, Button } from "./CardNew.style";
/*import {
  deleteDownvote,
  deleteUpvote,
  downvoteQuote,
  getUserQuote,
  upvoteQuote,
  voteCheck,
} from "../../api/QuoteApi";
import { ReactComponent as UpvoteBlack } from "../../assets/arrows/UpVoteBlack.svg";
import { ReactComponent as DownVoteBlack } from "../../assets/arrows/DownVoteBlack.svg";
import { ReactComponent as UpvoteOrange } from "../../assets/arrows/UpVoteOrange.svg";
import { ReactComponent as DownVoteOrange } from "../../assets/arrows/DownVoteOrange.svg";*/
import { useContext, useEffect, useState } from "react";
import { UpdateContext } from "../../../utils/UpdateContext";
import { CardNewProps } from "../../../interfaces/LocationInterfaces";
import { Link, useNavigate } from "react-router-dom";
import { getLocationImage } from "../../../api/LocationApi";

// Recives user and quote data, displays it, and handles quote voting

const CardNew: React.FC<CardNewProps> = ({ locationid }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("accessToken");

  const [image, setImage] = useState<string>();
  const { updated, setUpdated } = useContext(UpdateContext);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await getLocationImage(
          locationid!,
          JSON.parse(isLoggedIn)
        );
        const url = window.URL || window.webkitURL;
        const blobUrl = url.createObjectURL(response);
        setImage(blobUrl);
      })().catch((e) => {
        console.log("Error: Cant get location image. \n" + e);
      });
    }
  }, [updated, isLoggedIn, locationid]);

  /*
  useEffect(() => {
    (async () => {
      const response = await voteCheck(userid, JSON.parse(isLoggedIn!));
      setQuoteVoteStatus(response);
    })().catch((e) => {
      console.log("Error: Cant get state. \n" + e);
    });
  }, [updated, userid, isLoggedIn]);

  const updateQuote = async () => {
    const quote = await getUserQuote(userid);
    setUpdated(!updated);
    setUserKarma(quote.karma);
  };

  const upvote = async () => {
    await upvoteQuote(userid, JSON.parse(isLoggedIn!));
  };

  const downvote = async () => {
    await downvoteQuote(userid, JSON.parse(isLoggedIn!));
  };

  const deleteupvote = async () => {
    await deleteUpvote(userid, JSON.parse(isLoggedIn!));
  };

  const deletedownvote = async () => {
    await deleteDownvote(userid, JSON.parse(isLoggedIn!));
  };

  const handleUpvote = async () => {
    if (quoteVoteStatus === "NEUTRAL") {
      await upvote();
    } else if (quoteVoteStatus === "DOWNVOTE") {
      await deletedownvote();
      await upvote();
    } else if (quoteVoteStatus === "UPVOTE") {
      await deleteupvote();
    }
    await updateQuote();
  };

  const handleDownvote = async () => {
    if (quoteVoteStatus === "NEUTRAL") {
      await downvote();
    } else if (quoteVoteStatus === "UPVOTE") {
      await deleteupvote();
      await downvote();
    } else if (quoteVoteStatus === "DOWNVOTE") {
      await deletedownvote();
    }
    await updateQuote();
  };

  const UserProfile = async () => {
    return navigate(`/profile/${userid}`);
  };*/

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
