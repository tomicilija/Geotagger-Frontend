import { useState, useEffect, useContext, useRef } from "react";
import {
  Container,
  NotFound,
  Wrapper,
  Tittle,
  UploadImage,
  Image,
  Buttons,
  MapLocation,
  Map,
  Button,
  Icon,
  Form,
  Warning,
} from "./AddLocation.style";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
/*import Card from "../../components/card/Card";
import CardGrid from "../../components/card-grid/CardGrid";*/
import { Link, useParams, useNavigate } from "react-router-dom";
import { ReactComponent as DefaultProfileIcon } from "../../../assets/icons/profile.svg";
import LocationImg from "../../assets/s6L0uQyprpE.png";
/*import { getSignedInUser, getUserById, getUserVotes } from "../../api/UserApi";
import { getMyQuote, getUserQuote } from "../../api/QuoteApi";
import { UpdateContext } from "../../utils/UpdateContext";
import { QuoteResponse } from "../../interfaces/QuoteInterfaces";*/
import MapMarker from "../../../assets/icons/map-marker.png";
import DeleteIconImg from "../../../assets/icons/x-delete-icon.svg";
import PlaceholderImage from "../../../assets/placeholder-location-image.png";
import { preProcessFile } from "typescript";
import { UpdateContext } from "../../../utils/UpdateContext";
import { postLocation } from "../../../api/LocationApi";
import { Label, Input } from "reactstrap";
import * as yup from "yup";

// On profile page user quote, karma, and liked quotes is displayed

const AddLocation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("accessToken")
  );
  const navigate = useNavigate();
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
  const [ErrorMessage, setErrorMessage] = useState("");
  const { updated } = useContext(UpdateContext);
  const { id } = useParams();

  const [coordinates, setCoordinates] = useState({
    lat: 37.77414,
    lng: -122.420052,
  });
  const [addrss, setAddress] = useState("");
  const [markerVisibility, setMarkerVisibility] = useState(false);

  const mapsApiKey: string = process.env
    .REACT_APP_GOOGLE_MAPS_API_KEY as string;

  const locationSchema = yup.object().shape({
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

  const imageSchema = yup.object().shape({
    locationImage: yup
      .mixed()
      .test(
        "fileFormat",
        "Unsupported file format",
        (value) =>
          value &&
          value.type.match(
            /^image\/(jpeg|jpg|png|gif|tif|pjp|apng|ico|bmp|titf|jfif|svg)$/
          )
      )
      .required("New Location image is required to edit the location!"),
  });

  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
  });
  const [imageData, setImageData] = useState({
    profilePicture: null,
  });

  const [errors, setErrors] = useState<{ [field: string]: string }>({});

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
    getAddressFromCoordinates().catch((e) => {
      if (e.response.status === 401) {
        console.log("Unauthorized");
        setIsLoggedIn(null);
      } else {
        console.log("Error: Cant get location. \n" + e);
      }
    });
  }, [coordinates]);

  const handleMapClick = async (e: any) => {
    setCoordinates({
      lat: e.latLng?.lat() as number,
      lng: e.latLng?.lng() as number,
    });
    setMarkerVisibility(true);
    setLocationData({
      latitude: e.latLng?.lat(),
      longitude: e.latLng?.lng(),
    });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // To prevent refreshing the page on form submit
    try {
      await imageSchema.validate(imageData, { abortEarly: false });
      await locationSchema.validate(locationData, { abortEarly: false });
      setErrors({});
      (async () => {
        await postLocation(
          {
            name: addrss,
            latitude: Number(coordinates.lat.toFixed(6)),
            longitude: Number(coordinates.lng.toFixed(6)),
            image: image!,
          },
          JSON.parse(isLoggedIn!)
        );
        return navigate("/profile");
      })().catch((e) => {
        setErrorMessage(e.response.data.message);
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
    document.getElementById("locationImage")!.click();
  };

  const handleDiscard = async () => {
    setPreview(PlaceholderImage);
    document.getElementById("locationImage")!.blur();
    setImage(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationData({ ...locationData, [e.target.name]: e.target.value });
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImage(file);
    setImageData({ ...imageData, [event.target.name!]: file });
  };

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <Wrapper>
            <Tittle>
              <h4>
                Add a new <span>location</span>.
              </h4>
            </Tittle>
            <form onSubmit={handleSubmit}>
              <Form>
                <UploadImage>
                  <Image>
                    <img
                      src={preview}
                      alt="location"
                      style={{ objectFit: "cover" }}
                    />
                  </Image>
                  <Buttons>
                    <Button type="button" onClick={handleUpload}>
                      Upload image
                    </Button>
                    <Button type="button" onClick={handleDiscard}>
                      <Icon
                        style={{ backgroundImage: `url(${DeleteIconImg})` }}
                      />
                    </Button>
                    <Input
                      type="file"
                      name="locationImage"
                      id="locationImage"
                      onChange={(e) => handleChangeImage(e)}
                      style={{ display: "none" }}
                    />
                  </Buttons>
                  {errors.locationImage && (
                    <Warning>{errors.locationImage}</Warning>
                  )}
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
                  <Label for="location">Location</Label>
                  <Input
                    type="text"
                    name="locationName"
                    id="locationName"
                    disabled={true}
                    value={addrss}
                    onChange={handleChange}
                  />
                  <p>{ErrorMessage}</p>
                  <button type="submit">Add new</button>
                </MapLocation>
              </Form>
            </form>
          </Wrapper>
        </>
      ) : (
        <NotFound>
          <h3>
            Error 401! <span>Unauthorized</span>.
          </h3>
          <p>You are not logged in. Please log in to add a new locaton.</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            Go to homepage
          </Link>
        </NotFound>
      )}
    </Container>
  );
};

export default AddLocation;
