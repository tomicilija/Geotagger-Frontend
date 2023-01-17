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
} from "./ProfileSettings.style";
import PlaceholderImage from "../../../assets/default-avatar.svg";
import { deleteUser, getSignedInUser, updatePassword, updateProfilePicture, updateUser } from "../../../api/UserApi";

// Updating loggedin user information and deleteing loggedin user using modal, that overlays whole page

const ProfileSettings: FC<ProfileSettingsProps> = ({
  isSettingsOpen,
  setIsSettingsOpen,
}) => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const { updated, setUpdated } = useContext(UpdateContext);

  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>(PlaceholderImage);

  const [isChangePasswordOpen, setIsChangePasswordOpen] =
    useState<boolean>(false);
  const [isChangePictureOpen, setIsChangePictureOpen] =
    useState<boolean>(false);
  const [isInformationChangedOpen, setIsInformationChangedOpen] =
    useState<boolean>(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState<boolean>(true);

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
    e.preventDefault(); // To prevent refreshing the page on form submit

    (async () => {
      await updateUser(
        {
          email: newEmail,
          name: newFirstName,
          surname: newLastName,
        },
        JSON.parse(isLoggedIn!)
      );
      if (newEmail !== email) {
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
  };

  const handleSubmitProfilePicture = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();
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
  };

  const handleSubmitPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    (async () => {
      await updatePassword(
        {
          currentPassword: currentPassword,
          password: newPassword,
          passwordConfirm: newPasswordConfirm,
        },
        JSON.parse(isLoggedIn!)
      );
        localStorage.clear();
        window.location.href = "/signin";

    })().catch((err) => {
      setErrorMessage(err.response.data.message);
    });
  };

  const changePassword = async () => {
    (async () => {
      setIsUserInfoOpen(false);
      setIsChangePictureOpen(false);
      setIsChangePasswordOpen(true);
    })().catch((err) => {
      console.log(err);
      setErrorMessage(err.message);
    });
  };

  const changeProfilePicture = async () => {
    (async () => {
      setIsUserInfoOpen(false);
      setIsChangePasswordOpen(false);
      setIsChangePictureOpen(true);
    })().catch((err) => {
      console.log(err);
      setErrorMessage(err.message);
    });
  };

  const closeSettingsModal = async () => {
    (async () => {
      setIsUserInfoOpen(false);
      setIsChangePasswordOpen(false);
      setIsChangePictureOpen(false);
      setIsInformationChangedOpen(false);
      setIsSettingsOpen(false);
    })().catch((err) => {
      console.log(err);
      setErrorMessage(err.message);
    });
  };

  const closePasswordWindow = async () => {
    (async () => {
      setIsChangePictureOpen(false);
      setIsChangePasswordOpen(false);
      setIsUserInfoOpen(true);
      setIsSettingsOpen(true);
    })().catch((err) => {
      console.log(err);
      setErrorMessage(err.message);
    });
  };

  const closePictureWindow = async () => {
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

  const deleteProfile = async () => {
    (async () => {
      await deleteUser(JSON.parse(isLoggedIn!));
      setIsSettingsOpen(false);
      localStorage.clear();
      window.location.href = "/";
    })().catch((err) => {
      console.log(err);
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
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      placeholder={email}
                      value={newEmail}
                      required
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </SettingsSection>
                  <TwoInRow>
                    <SettingsSection>
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="firstname"
                        placeholder={firstName}
                        value={newFirstName}
                        required
                        onChange={(e) => setNewFirstName(e.target.value)}
                      />
                    </SettingsSection>
                    <SettingsSection>
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="lastname"
                        placeholder={lastName}
                        value={newLastName}
                        required
                        onChange={(e) => setNewLastName(e.target.value)}
                      />
                    </SettingsSection>
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
                    <label htmlFor="password">Current password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      required
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </SettingsSection>
                  <SettingsSection>
                    <label htmlFor="password">New password</label>
                    <input
                      type="password"
                      value={newPassword}
                      required
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </SettingsSection>
                  <SettingsSection>
                    <label htmlFor="confirmPassword">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      value={newPasswordConfirm}
                      required
                      onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    />
                  </SettingsSection>
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
              {/* <DefaultProfilePicture /> */}
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
                    <Buttons>
                      <Button type="button" onClick={handleUpload}>
                        Upload image
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        id="selectImages"
                        onChange={(e) => handleChange(e)}
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
