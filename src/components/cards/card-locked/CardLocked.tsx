import {
  Container,
  Location,
  Image,
  Overlay,
  LockedIcon,
} from "./CardLocked.style";
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
import { CardLockedProps } from "../../../interfaces/LocationInterfaces";
import { Link, useNavigate } from "react-router-dom";
import LockedIconImg from "../../../assets/icons/locked-icon.svg";
import { getLocationImage } from "../../../api/LocationApi";

// Recives user and quote data, displays it, and handles quote voting

const CardLocked: React.FC<CardLockedProps> = ({locationid}) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("accessToken");
  const [quoteVoteStatus, setQuoteVoteStatus] = useState("");
  const [userKarma, setUserKarma] = useState(0);
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

  return (
    <Container>
      <Location>
        <Image>
          <img src={image} alt="location" />
          <Overlay>
        <LockedIcon
          style={{ backgroundImage: `url(${LockedIconImg})`}}
        />
          </Overlay>
        </Image>
      </Location>
    </Container>
  );
};

export default CardLocked;
