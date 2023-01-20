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
import { getLocationImage } from "../../../api/LocationApi";

// Recives user and quote data, displays it, and handles quote voting

const CardEdit: React.FC<CardEditProps> = ({ locationid }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("accessToken");
  const [quoteVoteStatus, setQuoteVoteStatus] = useState("");
  const [userKarma, setUserKarma] = useState(0);
  const { updated, setUpdated } = useContext(UpdateContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>();

  const openDeleteModal = () => {
    localStorage.setItem("isDeleteModalOpen", "true");
    setUpdated(!updated);
  };

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
    <>
      <Container>
        <Location>
          <Image>
            <img src={`${image}`} alt="location" />
            <Edit>
              <Link
                to={`/location/edit/${locationid}`}
                style={{ textDecoration: "none" }}
              >
                <Button>
                  <Icon style={{ backgroundImage: `url(${EditIconImg})` }} />
                </Button>
              </Link>
              <Button onClick={openDeleteModal}>
                <Icon style={{ backgroundImage: `url(${DeleteIconImg})` }} />
              </Button>
            </Edit>
          </Image>
        </Location>
      </Container>
    </>
  );
};

export default CardEdit;
