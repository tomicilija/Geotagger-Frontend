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
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  MarkerF,
} from "@react-google-maps/api";
/*import Card from "../../components/card/Card";
import CardGrid from "../../components/card-grid/CardGrid";*/
import { Link, useParams } from "react-router-dom";
import MapMarker from "../../../assets/icons/map-marker.png";
import LocationImg from "../../../assets/icons/profile.svg";
/*import { getSignedInUser, getUserById, getUserVotes } from "../../api/UserApi";
import { getMyQuote, getUserQuote } from "../../api/QuoteApi";
import { UpdateContext } from "../../utils/UpdateContext";
import { QuoteResponse } from "../../interfaces/QuoteInterfaces";*/
import DeleteIconImg from "../../../assets/icons/x-delete-icon.svg";
import PlaceholderImage from "../../../assets/placeholder-location-image.png";
import * as img from "../../../assets/placeholder-location-image.png";
import { preProcessFile } from "typescript";
import { UpdateContext } from "../../../utils/UpdateContext";
import { getLocationImage } from "../../../api/LocationApi";
import { getGuessesByLocationId, guessLocation } from "../../../api/GuessApi";
import { GuessResponseById } from "../../../interfaces/LocationInterfaces";
import moment from "moment-timezone";
import { getSignedInUser, getUserProfilePicture } from "../../../api/UserApi";
import { sign } from "crypto";

// On profile page user quote, karma, and liked quotes is displayed

const GuessLocation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("accessToken")
  );
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
  const { updated } = useContext(UpdateContext);
  const { id } = useParams();
  const [addrss, setAddress] = useState("");
  const [errorDistance, setErrorDistance] = useState("");
  const [markerVisibility, setMarkerVisibility] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  const [locationGuesses, setLocationGuesses] = useState<GuessResponseById[]>(
    []
  );

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

  const fetchGuesses = async (): Promise<GuessResponseById[]> => {
    const response = await getGuessesByLocationId(id!, JSON.parse(isLoggedIn!));
    const guesses = Promise.all(
      response.map(async (guess) => {
        const diff = moment.duration(
          moment().diff(moment(guess.createdAt).format("YYYY-MM-DDTHH:mm:ss"))
        );
        const profilePicture = await getUserProfilePicture(
          guess.user.id,
          JSON.parse(isLoggedIn!)
        );
        const url = window.URL || window.webkitURL;
        const profilePictureUrl = url.createObjectURL(profilePicture);
        return {
          ...guess,
          createdAt:
            diff.asHours() < 24 && diff.asHours() > 1
              ? guess.createdAt.replace(
                  guess.createdAt,
                  Math.trunc(diff.asHours()) + " hours ago"
                )
              : diff.asHours() < 1 && diff.asMinutes() > 1
              ? guess.createdAt.replace(
                  guess.createdAt,
                  Math.trunc(diff.asMinutes()) + " mins ago"
                )
              : diff.asMinutes() < 1
              ? guess.createdAt.replace(guess.createdAt, "Now")
              : guess.createdAt.replace(
                  guess.createdAt,
                  Intl.DateTimeFormat("en-GB", {
                    timeStyle: "short",
                    dateStyle: "medium",
                  }).format(new Date(guess.createdAt))
                ),
          profilePicture: guess.user.profilePicture.replace(
            guess.user.profilePicture,
            profilePictureUrl
          ),
        };
      })
    );
    return guesses;
  };

  useEffect(() => {
    (async () => {
      const response = await getSignedInUser(JSON.parse(isLoggedIn!));
      setUserId(response.id);
    })().catch((e) => {
      console.log("Error: Cant get user. \n" + e);
    });

    fetchGuesses()
      .then((data) => setLocationGuesses(data))
      .catch((e) => {
        console.log("Error: Can't get location guesses. \n" + e);
      });
  }, [coordinates, id, isLoggedIn, errorDistance, userid]);

  useEffect(() => {
    getAddressFromCoordinates();
  }, [coordinates]);

  const handleMapClick = async (e: any) => {
    setCoordinates({
      lat: e.latLng?.lat() as number,
      lng: e.latLng?.lng() as number,
    });
    setMarkerVisibility(true);
  };

  const getAddressFromCoordinates = async () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: coordinates, language: "en" },
      (results, status) => {
        if (status === "OK") {
          if (results![0]) {
            setAddress(results![0].formatted_address);
          } else {
            console.log("No results found");
          }
        } else {
          console.log("Geocoder failed due to: " + status);
        }
      }
    );
  };

  const [locationImage, setLocationImage] = useState<string>(PlaceholderImage);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await getLocationImage(id!, JSON.parse(isLoggedIn));
        const url = window.URL || window.webkitURL;
        const blobUrl = url.createObjectURL(response);
        setLocationImage(blobUrl);
      })().catch((e) => {
        console.log("Error: Cant get location image. \n" + e);
      }).catch((e) => {
        if (e.response.status === 401) {
          console.log("Unauthorized");
          setIsLoggedIn(null);
        } else {
          console.log("Error: Cant get location. \n" + e);
        }
      });
    }
  }, [updated, isLoggedIn, id]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // To prevent refreshing the page on form submit
    (async () => {
      const response = await guessLocation(
        {
          id: id!,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        },
        JSON.parse(isLoggedIn!)
      );
      setErrorDistance(response.distance.toString());
    })().catch((err) => {
      setErrorMessage(err.response.data.message);
    });
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
            <form onSubmit={handleSubmit}>
              <Form>
                <UploadImage>
                  <Image>
                    <img
                      src={`${locationImage}`}
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
                        onClick={handleMapClick}
                      >
                        {coordinates && (
                          <MarkerF
                            position={coordinates}
                            icon={MapMarker}
                            visible={markerVisibility}
                          />
                        )}
                      </GoogleMap>
                    </Map>
                  ) : (
                    <h3>Loading...</h3>
                  )}
                  <GuessForm>
                    <GuessFormSection>
                      <label htmlFor="errDist">Error distance</label>
                      <input
                        type="errDist"
                        disabled={true}
                        value={errorDistance}
                      />
                    </GuessFormSection>
                    <GuessFormSection>
                      <label htmlFor="location">Location</label>
                      <input type="location" disabled={true} value={addrss} />
                    </GuessFormSection>
                  </GuessForm>
                  <p>{ErrorMessage}</p>
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
              {locationGuesses.map((guess, index) => (
                <>
                  {userid === guess.user.id && guess.createdAt==="Now" ? (
                    <Row className="you-row fadeInFromAbove">
                      <LeftSide>
                        <Rank className="rank">
                          <p>{index + 1}</p>
                        </Rank>
                        <Profile>
                          <Avatar>
                            <img src={`${guess.profilePicture}`} alt="pp" />
                          </Avatar>
                          <ProfileInfo>
                            <ProfileName>You</ProfileName>
                            <GuessTime>{guess.createdAt}</GuessTime>
                          </ProfileInfo>
                        </Profile>
                      </LeftSide>
                      <RightSide>
                        <Distance className="you-distance">{guess.distance} m</Distance>
                      </RightSide>
                    </Row>
                  ) : userid === guess.user.id && guess.createdAt!=="Now" ? (
                    <Row className="you-row">
                      <LeftSide>
                        <Rank className="rank">
                          <p>{index + 1}</p>
                        </Rank>
                        <Profile>
                          <Avatar>
                            <img src={`${guess.profilePicture}`} alt="pp" />
                          </Avatar>
                          <ProfileInfo>
                            <ProfileName>You</ProfileName>
                            <GuessTime>{guess.createdAt}</GuessTime>
                          </ProfileInfo>
                        </Profile>
                      </LeftSide>
                      <RightSide>
                        <Distance className="you-distance">{guess.distance} m</Distance>
                      </RightSide>
                    </Row>
                  ) : (
                    <Row>
                      <LeftSide>
                        <Rank className="rank">
                          <p>{index + 1}</p>
                        </Rank>
                        <Profile>
                          <Avatar>
                            <img src={`${guess.profilePicture}`} alt="pp" />
                          </Avatar>
                          <ProfileInfo>
                            <ProfileName>
                              {guess.user.name} {guess.user.surname}
                            </ProfileName>
                            <GuessTime>{guess.createdAt}</GuessTime>
                          </ProfileInfo>
                        </Profile>
                      </LeftSide>
                      <RightSide>
                        <Distance>{guess.distance} m</Distance>
                      </RightSide>
                    </Row>
                  )}
                </>
              ))}
            </Table>
          </Leaderboard>
        </>
      ) : (
        <NotFound>
          <h3>
            Error 401! <span>Unauthorized</span>.
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
