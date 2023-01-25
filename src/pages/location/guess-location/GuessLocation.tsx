import { useState, useEffect, useContext, useCallback } from "react";
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
  Warning,
} from "./GuessLocation.style";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import { Link, useParams } from "react-router-dom";
import MapMarker from "../../../assets/icons/map-marker.png";
import PlaceholderImage from "../../../assets/placeholder-location-image.png";
import { UpdateContext } from "../../../utils/UpdateContext";
import { getLocationImage } from "../../../api/LocationApi";
import { getGuessesByLocationId, guessLocation } from "../../../api/GuessApi";
import { GuessResponseById } from "../../../interfaces/LocationInterfaces";
import moment from "moment-timezone";
import { getSignedInUser, getUserProfilePicture } from "../../../api/UserApi";
import { Label, Input } from "reactstrap";
import * as yup from "yup";

const GuessLocation = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const [userid, setUserId] = useState("");
  const { id } = useParams();
  const [addrss, setAddress] = useState("");
  const [errorDistance, setErrorDistance] = useState("");
  const [markerVisibility, setMarkerVisibility] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [locationGuesses, setLocationGuesses] = useState<GuessResponseById[]>(
    []
  );
  const [errors, setErrors] = useState<{ [field: string]: string }>({});
  const [coordinates, setCoordinates] = useState({
    lat: 37.77414,
    lng: -122.420052,
  });
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
  });
  const [locationImage, setLocationImage] = useState<string>(PlaceholderImage);
  const mapsApiKey: string = process.env
    .REACT_APP_GOOGLE_MAPS_API_KEY as string;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapsApiKey,
  });

  const schema = yup.object().shape({
    latitude: yup
      .string()
      .required("Latitude is required")
      .test(
        "is-num",
        "You are required to select location before submiting your guess!",
        (val) => !isNaN(parseFloat(val!))
      ),
    longitude: yup
      .string()
      .required("Longitude is required")
      .test("is-num", (val) => !isNaN(parseFloat(val!))),
  });
  const getAddressFromCoordinates = useCallback(async () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: coordinates, language: "en" },
      (results, status) => {
        if (status === "OK") {
          if (results![0]) {
            setAddress(results![0].formatted_address);
          }
        }
      }
    );
  }, [coordinates]);

  const fetchGuessData = useCallback(
    async (data: GuessResponseById[]): Promise<GuessResponseById[]> => {
      const guesses = Promise.all(
        data.map(async (guess) => {
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
    },
    [isLoggedIn]
  );

  const fetchLocationGuesses = useCallback(async () => {
    if (isLoggedIn) {
      const [user, locationImage, guesses] = await Promise.all([
        getSignedInUser(JSON.parse(isLoggedIn)),
        getLocationImage(id!),
        getGuessesByLocationId(id!, JSON.parse(isLoggedIn!)),
      ]);
      setUserId(user.id);

      const url = window.URL || window.webkitURL;
      const blobUrl = url.createObjectURL(locationImage);
      setLocationImage(blobUrl);

      setLocationGuesses(await fetchGuessData(guesses));
    }
  }, [fetchGuessData, id, isLoggedIn]);

  const handleMapClick = (e: any) => {
    setCoordinates({
      lat: e.latLng?.lat() as number,
      lng: e.latLng?.lng() as number,
    });
    setFormData({
      latitude: e.latLng?.lat(),
      longitude: e.latLng?.lng(),
    });
    setMarkerVisibility(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
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
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          validationErrors[error.path!] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  useEffect(() => {
    fetchLocationGuesses().catch((e) => {
      console.log("Error: Cant get data. \n" + e);
    });
    getAddressFromCoordinates().catch((e) => {
      console.log("Error: Cant get location address. \n" + e);
    });
  }, [isLoggedIn, coordinates, errorDistance, userid, fetchLocationGuesses, getAddressFromCoordinates]);

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
                  {errors.latitude && <Warning>{errors.latitude}</Warning>}
                  <GuessForm>
                    <GuessFormSection>
                      <Label for="errDist">Error distance</Label>
                      <Input
                        type="text"
                        name="distance"
                        id="distance"
                        disabled={true}
                        value={errorDistance}
                      />
                    </GuessFormSection>
                    <GuessFormSection>
                      <Label for="location">Location</Label>
                      <Input
                        type="text"
                        name="locationName"
                        id="locationName"
                        disabled={true}
                        value={addrss}
                        onChange={handleChange}
                      />
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
                  {userid === guess.user.id && guess.createdAt === "Now" ? (
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
                        <Distance className="you-distance">
                          {guess.distance} m
                        </Distance>
                      </RightSide>
                    </Row>
                  ) : userid === guess.user.id && guess.createdAt !== "Now" ? (
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
                        <Distance className="you-distance">
                          {guess.distance} m
                        </Distance>
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
