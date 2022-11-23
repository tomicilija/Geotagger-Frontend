import {
  Container,
  Location,
  Image,
  Button,
  Edit,
  Icon,
} from "./CardEdit.style";
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
import { CardEditProps } from "../../../interfaces/LocationInterfaces";
import { Link, useNavigate } from "react-router-dom";
import EditIconImg from "../../../assets/icons/pen-edit-icon.svg";
import DeleteIconImg from "../../../assets/icons/x-delete-icon.svg";

// Recives user and quote data, displays it, and handles quote voting

const CardEdit: React.FC<CardEditProps> = ({
  locationid,
  image,
  /*quote,
  firstName,
  lastName,*/
}) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("accessToken");
  const [quoteVoteStatus, setQuoteVoteStatus] = useState("");
  const [userKarma, setUserKarma] = useState(0);
  const { updated, setUpdated } = useContext(UpdateContext);
  /*
  useEffect(() => {
    setUserKarma(karma);
  }, [updated, karma]);

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
          <img src={image} alt="location" />
          <Edit>
            <Link
              to={`/location/${locationid}`}
              style={{ textDecoration: "none" }}
            >
              <Button>
                <Icon style={{ backgroundImage: `url(${EditIconImg})` }} />
              </Button>
            </Link>
            <Button onClick={() => {}}>
              {/*{openDeleteModal}}*/}
              <Icon style={{ backgroundImage: `url(${DeleteIconImg})` }} />
            </Button>
          </Edit>
        </Image>
      </Location>
    </Container>
  );
};

export default CardEdit;
