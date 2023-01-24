import { useState, useEffect } from "react";
import {
  Container,
  NotFound,
  Wrapper,
  Tittle,
  UploadImage,
  Image,
  Buttons,
  Button,
  Warning,
} from "./EditLocation.style";
import { Link, useNavigate, useParams } from "react-router-dom";
import PlaceholderImage from "../../../assets/placeholder-location-image.png";
import {
  getLocationById,
  getLocationImage,
  updateLocation,
} from "../../../api/LocationApi";
import {  Input } from "reactstrap";
import * as yup from "yup";

const EditLocation = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [addrss, setAddress] = useState("");
  const { id } = useParams();
  const [ErrorMessage, setErrorMessage] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: 37.77414,
    lng: -122.420052,
  });
  const [errors, setErrors] = useState<{ [field: string]: string }>({});
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>(PlaceholderImage);
  const [locationImage, setLocationImage] = useState<string>(PlaceholderImage);
  const [formData, setFormData] = useState({
    profilePicture: null,
  });

  const schema = yup.object().shape({
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

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await getLocationById(id!, JSON.parse(isLoggedIn!));
        setAddress(response.name);
        setCoordinates({
          lat: response.latitude as number,
          lng: response.longitude as number,
        });
      })().catch((e) => {
        setErrorMessage(e.response.data.message);
      });

      (async () => {
        const response = await getLocationImage(id!);
        const url = window.URL || window.webkitURL;
        const blobUrl = url.createObjectURL(response);
        setLocationImage(blobUrl);
        setPreview(blobUrl);
      })()
        .catch((e) => {
          console.log("Error: Cant get location image. \n" + e);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            console.log("Unauthorized");
            localStorage.setItem("accessToken", "");
          } else {
            console.log("Error: Cant get location. \n" + e);
          }
        });
    }
  }, [isLoggedIn, id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      (async () => {
        await updateLocation(
          id!,
          {
            name: addrss,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
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

  const handleUpload = () => {
    document.getElementById("locationImage")!.click();
  };

  const handleDiscard = () => {
    setPreview(locationImage);
    document.getElementById("locationImage")!.blur();
    setImage(undefined);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImage(file);
    setFormData({ ...formData, [event.target.name!]: file });
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <Wrapper>
            <Tittle>
              <h4>
                Edit <span>location</span>.
              </h4>
            </Tittle>
            <form onSubmit={handleSubmit}>
              <UploadImage>
                <Image>
                  <img
                    src={`${preview}`}
                    alt="location"
                    style={{ objectFit: "cover" }}
                  />
                </Image>
                <p>Location: {addrss}</p>
                <p>{ErrorMessage}</p>
                <Buttons>
                  <Button type="button" onClick={handleUpload}>
                    Upload image
                  </Button>
                  <div>
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={handleDiscard}>
                      Cancel
                    </Button>
                  </div>
                  <Input
                    type="file"
                    name="locationImage"
                    id="locationImage"
                    onChange={(e) => handleChange(e)}
                    style={{ display: "none" }}
                  />
                </Buttons>
                {errors.locationImage && (
                  <Warning>{errors.locationImage}</Warning>
                )}
              </UploadImage>
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

export default EditLocation;
