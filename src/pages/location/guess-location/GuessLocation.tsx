import { useState, useEffect, useContext, useRef } from "react";
import {
  Container,
  NotFound,
  Wrapper,
  Tittle,
  UploadImage,
  Image,
  MapLocation,
  Map,
  Leaderboard,
  Table,
  Row,
  LeftSide,
  RightSide,
  Distance,
  Rank,
  Profile,
  Avatar,
  ProfileInfo,
  ProfileName,
  GuessTime,
  GuessForm,
  GuessFormSection,
  Form,
} from "./GuessLocation.style";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
/*import Card from "../../components/card/Card";
import CardGrid from "../../components/card-grid/CardGrid";*/
import { Link, useParams } from "react-router-dom";
import { ReactComponent as DefaultProfileIcon } from "../../../assets/icons/profile.svg";
import LocationImg from "../../../assets/icons/profile.svg";
/*import { getSignedInUser, getUserById, getUserVotes } from "../../api/UserApi";
import { getMyQuote, getUserQuote } from "../../api/QuoteApi";
import { UpdateContext } from "../../utils/UpdateContext";
import { QuoteResponse } from "../../interfaces/QuoteInterfaces";*/
import DeleteIconImg from "../../../assets/icons/x-delete-icon.svg";
import PlaceholderImage from "../../../assets/placeholder-location-image.png";
import * as img from "../../../assets/placeholder-location-image.png";
import { preProcessFile } from "typescript";

// On profile page user quote, karma, and liked quotes is displayed

const GuessLocation = () => {
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
  const [isThreeCollumnSizeGrid, setIsThreeCollumnSizeGrid] = useState(
    window.innerWidth > 1340
  );
  //const { updated } = useContext(UpdateContext);
  const { id } = useParams();

  const isLocationGuessed = true;

  const [coordinates, setCoordinates] = useState({
    lat: 37.77414,
    lng: -122.420052,
  });

  const mapsApiKey: string = process.env
    .REACT_APP_GOOGLE_MAPS_API_KEY as string;

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

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapsApiKey,
  });

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>(PlaceholderImage);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  const handleUpload = async () => {
    document.getElementById("selectImages")!.click();
  };

  const handleDiscard = async () => {
    setPreview(PlaceholderImage);
    document.getElementById("selectImages")!.blur();
    setImage(undefined);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImage(file);
  };

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <Wrapper>
            <Tittle>
              <h4>
                Take a <span>guess</span>!
              </h4>
            </Tittle>
            <form>
              <Form>
                {/*onSubmit={handleSubmit}*/}
                <UploadImage>
                  <Image>
                    <img
                      src={preview}
                      alt="location"
                      style={{ objectFit: "cover" }}
                    />
                  </Image>
                </UploadImage>
                <MapLocation>
                  {isLoaded ? (
                    <Map>
                      <GoogleMap
                        zoom={11}
                        center={coordinates}
                        mapContainerClassName="map-container"
                        options={{
                          keyboardShortcuts: false,
                          disableDefaultUI: true,
                        }}
                        onClick={(e: any) => {
                          setCoordinates({
                            lat: e.latLng?.lat() as number,
                            lng: e.latLng?.lng() as number,
                          });
                        }}
                      >
                        <Marker
                          position={{ lat: 37.77414, lng: -122.420052 }}
                        />
                      </GoogleMap>
                    </Map>
                  ) : (
                    <h3>Loading...</h3>
                  )}
                  <GuessForm>
                    <GuessFormSection>
                      <label htmlFor="errDist">Error distance</label>
                      <input type="errDist" required />
                    </GuessFormSection>
                    <GuessFormSection>
                      <label htmlFor="location">Location</label>
                      <input type="location" required />
                    </GuessFormSection>
                  </GuessForm>
                  <button type="submit">Guess</button>
                </MapLocation>
              </Form>
            </form>
          </Wrapper>
          <Leaderboard>
            <Tittle>
              <h4>Leaderboard</h4>
            </Tittle>
            <Table>
              <Row>
                <LeftSide>
                  <Rank className="rank">
                    <p>1</p>
                  </Rank>
                  <Profile>
                    <Avatar>
                      <img src={`${LocationImg}`} alt="location" />
                    </Avatar>
                    <ProfileInfo>
                      <ProfileName>Elanor Pera</ProfileName>
                      <GuessTime>23. 4. 2021</GuessTime>
                    </ProfileInfo>
                  </Profile>
                </LeftSide>
                <RightSide>
                  <Distance>5m</Distance>
                </RightSide>
              </Row>
              <Row>
                <LeftSide>
                  <Rank className="rank">
                    <p>2</p>
                  </Rank>
                  <Profile>
                    <Avatar>
                      <img src={`${LocationImg}`} alt="location" />
                    </Avatar>
                    <ProfileInfo>
                      <ProfileName>Elmer Laverty</ProfileName>
                      <GuessTime>4. 5. 2021</GuessTime>
                    </ProfileInfo>
                  </Profile>
                </LeftSide>
                <RightSide>
                  <Distance>10m</Distance>
                </RightSide>
              </Row>
              <Row>
                <LeftSide>
                  <Rank className="rank">
                    <p>3</p>
                  </Rank>
                  <Profile>
                    <Avatar>
                      <img src={`${LocationImg}`} alt="location" />
                    </Avatar>
                    <ProfileInfo>
                      <ProfileName>Benny Spanbauer</ProfileName>
                      <GuessTime>5 hours ago</GuessTime>
                    </ProfileInfo>
                  </Profile>
                </LeftSide>
                <RightSide>
                  <Distance>23m</Distance>
                </RightSide>
              </Row>
              <Row>
                <LeftSide>
                  <Rank className="rank">
                    <p>4</p>
                  </Rank>
                  <Profile>
                    <Avatar>
                      <img src={`${LocationImg}`} alt="location" />
                    </Avatar>
                    <ProfileInfo>
                      <ProfileName>Krishna Barbe</ProfileName>
                      <GuessTime>50 mins ago</GuessTime>
                    </ProfileInfo>
                  </Profile>
                </LeftSide>
                <RightSide>
                  <Distance>27m</Distance>
                </RightSide>
              </Row>
              <Row className={`${isLocationGuessed}`}>
                <LeftSide>
                  <Rank className="rank">
                    <p>5</p>
                  </Rank>
                  <Profile>
                    <Avatar>
                      <img src={`${LocationImg}`} alt="location" />
                    </Avatar>
                    <ProfileInfo>
                      <ProfileName>You</ProfileName>
                      <GuessTime>1 min ago</GuessTime>
                    </ProfileInfo>
                  </Profile>
                </LeftSide>
                <RightSide>
                  <Distance className={`${isLocationGuessed}`}>50m</Distance>
                </RightSide>
              </Row>
              <Row>
                <LeftSide>
                  <Rank className="rank">
                    <p>6</p>
                  </Rank>
                  <Profile>
                    <Avatar>
                      <img src={`${LocationImg}`} alt="location" />
                    </Avatar>
                    <ProfileInfo>
                      <ProfileName>Darcel Ballentine Ballentine</ProfileName>
                      <GuessTime>12. 12. 2021</GuessTime>
                    </ProfileInfo>
                  </Profile>
                </LeftSide>
                <RightSide>
                  <Distance>3253250m</Distance>
                </RightSide>
              </Row>
            </Table>
          </Leaderboard>
        </>
      ) : (
        <NotFound>
          <h3>
            Error 402! <span>Unauthorized</span>.
          </h3>
          <p>You are not logged in. Please log in to guess the locaton.</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            Go to homepage
          </Link>
        </NotFound>
      )}
    </Container>
  );
};

export default GuessLocation;
