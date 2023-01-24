import { FC, useContext, useEffect, useState } from "react";
import { ProfileSettingsProps } from "../../../interfaces/LocationInterfaces";
import { UpdateContext } from "../../../utils/UpdateContext";
import {
  Container,
  Wrapper,
  SettingsHeader,
  SettingsForm,
  SettingsSection,
  TwoInRow,
  ChangeSetings,
  Image,
  UploadImage,
  Buttons,
  Button,
  ConfirmationWrapper,
  Warning,
  Peek,
  PeekImg,
} from "./ProfileSettings.style";
import PlaceholderImage from "../../../assets/default-avatar.svg";
import {
  deleteUser,
  getSignedInUser,
  updatePassword,
  updateProfilePicture,
  updateUser,
} from "../../../api/UserApi";
import PeekIconImg from "../../../assets/icons/peek-icon.svg";
import { Label, Input } from "reactstrap";
import * as yup from "yup";

const ProfileSettings: FC<ProfileSettingsProps> = ({
  isSettingsOpen,
  setIsSettingsOpen,
}) => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const { updated, setUpdated } = useContext(UpdateContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>(PlaceholderImage);
  const [isChangePasswordOpen, setIsChangePasswordOpen] =
    useState<boolean>(false);
  const [isChangePictureOpen, setIsChangePictureOpen] =
    useState<boolean>(false);
  const [isInformationChangedOpen, setIsInformationChangedOpen] =
    useState<boolean>(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ [field: string]: string }>({});
  
  const [proflePicutreFormData, setProfilePictureFormData] = useState({
    profilePicture: null,
  });
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [userFormData, setUserFormData] = useState({
    email: "",
    name: "",
    surname: "",
  });

  const userSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    name: yup.string().required("Name is required"),
    surname: yup.string().required("Surname is required"),
  });
  const passwordSchema = yup.object().shape({
    currentPassword: yup.string().required("Current password is required"),
    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Password is too weak (Must contain: at least 1 upper case letter, least 1 lower case letter, 1 number or special character)"
      )
      .required("Password is required"),
    newPasswordConfirm: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  const proflePicutreSchema = yup.object().shape({
    profilePicture: yup
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
      .required("Profile picture is required"),
  });

  const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordFormData({
      ...passwordFormData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setIsUserInfoOpen(isSettingsOpen);
  }, [isSettingsOpen]);

  useEffect(() => {
    getSignedInUser(JSON.parse(isLoggedIn!))
      .then(({ email, name, surname, id }) => {
        setEmail(email);
        setFirstName(name);
        setLastName(surname);
      })
      .catch((e) => {
        console.log("Error: Cant get user. \n" + e);
      });
  });

  const handleSubmitUserInfo = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await userSchema.validate(userFormData, { abortEarly: false });
      setErrors({});
      (async () => {
        await updateUser(
          {
            email: userFormData.email,
            name: userFormData.name,
            surname: userFormData.surname,
          },
          JSON.parse(isLoggedIn!)
        );
        if (userFormData.email !== email) {
          localStorage.clear();
          window.location.href = "/signin";
        } else {
          setUpdated(!updated);
          setIsUserInfoOpen(false);
          setIsInformationChangedOpen(true);
        }
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

  const handleSubmitProfilePicture = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    try {
      await proflePicutreSchema.validate(proflePicutreFormData, {
        abortEarly: false,
      });
      setErrors({});
      (async () => {
        await updateProfilePicture(
          {
            profilePicture: image!,
          },
          JSON.parse(isLoggedIn!)
        );
        setUpdated(!updated);
        setIsChangePictureOpen(false);
        setIsInformationChangedOpen(true);
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

  const handleSubmitPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // To prevent refreshing the page on form submit
    try {
      await passwordSchema.validate(passwordFormData, {
        abortEarly: false,
      });
      setErrors({});
      (async () => {
        await updatePassword(
          {
            currentPassword: passwordFormData.currentPassword,
            password: passwordFormData.newPassword,
            passwordConfirm: passwordFormData.newPasswordConfirm,
          },
          JSON.parse(isLoggedIn!)
        );
        localStorage.clear();
        window.location.href = "/signin";
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

  const changePassword = () => {
      setIsUserInfoOpen(false);
      setIsChangePictureOpen(false);
      setIsChangePasswordOpen(true);
  };

  const changeProfilePicture = () => {
      setIsUserInfoOpen(false);
      setIsChangePasswordOpen(false);
      setIsChangePictureOpen(true);
  };

  const closeSettingsModal = () => {
      setIsUserInfoOpen(false);
      setIsChangePasswordOpen(false);
      setIsChangePictureOpen(false);
      setIsInformationChangedOpen(false);
      setIsSettingsOpen(false);
  };

  const closePasswordWindow = () => {
      setIsChangePictureOpen(false);
      setIsChangePasswordOpen(false);
      setIsUserInfoOpen(true);
      setIsSettingsOpen(true);
  };

  const closePictureWindow = () => {
    (async () => {
      setIsChangePictureOpen(false);
      setIsChangePasswordOpen(false);
      setIsUserInfoOpen(true);
      setIsSettingsOpen(true);
      await handleDiscard();
    })().catch((err) => {
      console.log(err);
      setErrorMessage(err.message);
    });
  };

  const deleteProfile = () => {
    (async () => {
      await deleteUser(JSON.parse(isLoggedIn!));
      setIsSettingsOpen(false);
      localStorage.clear();
      window.location.href = "/";
    })().catch((err) => {
      setErrorMessage(err.message);
    });
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

  const handleUpload = () => {
    document.getElementById("profilePicture")!.click();
  };

  const handleDiscard = () => {
    setPreview(PlaceholderImage);
    document.getElementById("profilePicture")!.blur();
    setImage(undefined);
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImage(file);
    setProfilePictureFormData({
      ...proflePicutreFormData,
      [event.target.name!]: event.target.files![0]!,
    });
  };

  return (
    <>
      {isSettingsOpen ? (
        <Container>
          {isUserInfoOpen ? (
            <Wrapper>
              <SettingsHeader>
                <h4>
                  Profile <span>settings.</span>
                </h4>
                <p>Change your profile settings</p>
                <h5>{ErrorMessage}</h5>
              </SettingsHeader>
              {/* <DefaultProfilePicture /> */}
              <form onSubmit={handleSubmitUserInfo}>
                <SettingsForm>
                  <SettingsSection>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder={email}
                      value={userFormData.email}
                      onChange={handleChangeUserInfo}
                    />
                  </SettingsSection>
                  {errors.email && <Warning>{errors.email}</Warning>}
                  <TwoInRow>
                    <SettingsSection>
                      <Label for="firstName">First Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={userFormData.name}
                        onChange={handleChangeUserInfo}
                        placeholder={firstName}
                      />
                    </SettingsSection>
                    <SettingsSection>
                      <Label for="lastName">Last Name</Label>
                      <Input
                        type="text"
                        name="surname"
                        id="surname"
                        placeholder={lastName}
                        value={userFormData.surname}
                        onChange={handleChangeUserInfo}
                      />
                    </SettingsSection>
                  </TwoInRow>
                  <TwoInRow>
                    {errors.name && <Warning>{errors.name}</Warning>}
                    {errors.surname && <Warning>{errors.surname}</Warning>}
                  </TwoInRow>
                  <SettingsSection>
                    <ChangeSetings>
                      <button type="button" onClick={changePassword}>
                        Change password
                      </button>
                      <button type="button" onClick={changeProfilePicture}>
                        Change profile picture
                      </button>
                    </ChangeSetings>
                    <TwoInRow>
                      <button type="submit">Submit</button>
                      <p onClick={closeSettingsModal}>Cancel</p>
                    </TwoInRow>
                    <p onClick={deleteProfile}>Delete Profile</p>
                  </SettingsSection>
                </SettingsForm>
              </form>
            </Wrapper>
          ) : isChangePasswordOpen ? (
            <Wrapper>
              <SettingsHeader>
                <h4>
                  Profile <span>settings.</span>
                </h4>
                <p>Change your password.</p>
                <h5>{ErrorMessage}</h5>
              </SettingsHeader>
              {/* <DefaultProfilePicture /> */}
              <form onSubmit={handleSubmitPassword}>
                <SettingsForm>
                  <SettingsSection>
                    <Label for="password">Current password</Label>
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      id="currentPassword"
                      value={passwordFormData.currentPassword}
                      onChange={handleChangePassword}
                    />
                    <Peek
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      <PeekImg
                        className={showCurrentPassword ? "seen" : "hidden"}
                        style={{ backgroundImage: `url(${PeekIconImg})` }}
                      />
                    </Peek>
                  </SettingsSection>
                  {errors.currentPassword && (
                    <Warning>{errors.currentPassword}</Warning>
                  )}
                  <SettingsSection>
                    <Label for="password">New password</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      value={passwordFormData.newPassword}
                      onChange={handleChangePassword}
                    />
                    <Peek
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <PeekImg
                        className={showPassword ? "seen" : "hidden"}
                        style={{ backgroundImage: `url(${PeekIconImg})` }}
                      />
                    </Peek>
                  </SettingsSection>
                  {errors.newPassword && (
                    <Warning>{errors.newPassword}</Warning>
                  )}
                  <SettingsSection>
                    <Label for="confirmPassword">Confirm new password</Label>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="newPasswordConfirm"
                      id="newPasswordConfirm"
                      value={passwordFormData.newPasswordConfirm}
                      onChange={handleChangePassword}
                    />
                    <Peek
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <PeekImg
                        className={showConfirmPassword ? "seen" : "hidden"}
                        style={{ backgroundImage: `url(${PeekIconImg})` }}
                      />
                    </Peek>
                  </SettingsSection>
                  {errors.newPasswordConfirm && (
                    <Warning>{errors.newPasswordConfirm}</Warning>
                  )}
                  <SettingsSection>
                    <TwoInRow>
                      <button type="submit">Submit</button>
                      <p onClick={closePasswordWindow}>Cancel</p>
                    </TwoInRow>
                  </SettingsSection>
                </SettingsForm>
              </form>
            </Wrapper>
          ) : isChangePictureOpen ? (
            <Wrapper>
              <SettingsHeader>
                <h4>
                  Profile <span>settings.</span>
                </h4>
                <p>Change your profile photo.</p>
                <h5>{ErrorMessage}</h5>
              </SettingsHeader>
              <form onSubmit={handleSubmitProfilePicture}>
                <SettingsForm>
                  <UploadImage>
                    <Image>
                      <img
                        src={preview}
                        alt="location"
                        style={{ objectFit: "cover" }}
                      />
                    </Image>
                    {errors.profilePicture && (
                      <Warning>{errors.profilePicture}</Warning>
                    )}
                    <Buttons>
                      <Button type="button" onClick={handleUpload}>
                        Upload image
                      </Button>
                      <Input
                        type="file"
                        name="profilePicture"
                        id="profilePicture"
                        onChange={handleChangeImage}
                        style={{ display: "none" }}
                      />
                    </Buttons>
                  </UploadImage>
                  <SettingsSection>
                    <TwoInRow>
                      <button type="submit">Submit</button>
                      <p onClick={closePictureWindow}>Cancel</p>
                    </TwoInRow>
                  </SettingsSection>
                </SettingsForm>
              </form>
            </Wrapper>
          ) : isInformationChangedOpen ? (
            <ConfirmationWrapper>
              <SettingsHeader>
                <h4>Information changed.</h4>
                <p>Your settings are saved.</p>
              </SettingsHeader>
              <button onClick={closeSettingsModal}>Close</button>
            </ConfirmationWrapper>
          ) : null}
        </Container>
      ) : null}
    </>
  );
};

export default ProfileSettings;
