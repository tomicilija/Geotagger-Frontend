import {
  Container,
  Location,
  Image,
  Button,
  Edit,
  Icon,
} from "./CardEdit.style";
import { useContext, useEffect, useState } from "react";
import { UpdateContext } from "../../../utils/UpdateContext";
import { CardEditProps } from "../../../interfaces/LocationInterfaces";
import { Link } from "react-router-dom";
import EditIconImg from "../../../assets/icons/pen-edit-icon.svg";
import DeleteIconImg from "../../../assets/icons/x-delete-icon.svg";
import { getLocationImage } from "../../../api/LocationApi";

const CardEdit: React.FC<CardEditProps> = ({ locationid }) => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const { updated, setUpdated } = useContext(UpdateContext);
  const [image, setImage] = useState<string>();

  const openDeleteModal = () => {
    localStorage.setItem("deleteLocationId", locationid);
    localStorage.setItem("isDeleteModalOpen", "true");
    setUpdated(!updated);
  };

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await getLocationImage(
          locationid!
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
