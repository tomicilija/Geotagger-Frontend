import { FC, useContext, useEffect, useState } from "react"; /*
import { deleteUser, getSignedInUser, signIn, updateUser } from "../../../api/UserApi";*/
import { ForgotPasswordProps } from "../../../interfaces/LocationInterfaces";
import { UpdateContext } from "../../../utils/UpdateContext";
import {
  Container,
  Wrapper,
  SettingsHeader,
  SettingsForm,
  SettingsSection,
  TwoInRow,
  ConfirmationWrapper,
} from "./ForgotPassword.style";
import PlaceholderImage from "../../../assets/default-avatar.svg";
import { deleteLocation } from "../../../api/LocationApi";
import { forgotPassword } from "../../../api/UserApi";

// Updating loggedin user information and deleteing loggedin user using modal, that overlays whole page

const ForgotPassword = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const { updated, setUpdated } = useContext(UpdateContext);

  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>(PlaceholderImage);

  const [isForgotPasswordOpen, setForgotPasswordOpen] =
    useState<boolean>(false);
  const [isSureOpen, setIsSureOpen] = useState<boolean>(false);
  const [isForgotPassOpen, setIsForgotPassOpen] = useState<boolean>(false);

  const forgotPasswordModal = localStorage.getItem("isForgotPasswordModalOpen");

  useEffect(() => {
    setIsForgotPassOpen(JSON.parse(forgotPasswordModal!) === true);
    setIsSureOpen(JSON.parse(forgotPasswordModal!) === true);
  }, [forgotPasswordModal, updated]);

  const handleForgotPass = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // To prevent refreshing the page on form submit

    console.log(email);
    (async () => {
      await forgotPassword({
        email: email,
      });
      setIsSureOpen(false);
      setForgotPasswordOpen(true);
    })().catch((err) => {
      setErrorMessage(err.response.data.message);
    });
  };

  const closeForgotPasswordModal = async () => {
    (async () => {
      setIsSureOpen(false);
      setForgotPasswordOpen(false);
      setIsForgotPassOpen(false);
      localStorage.setItem("isForgotPasswordModalOpen", "false");
      setUpdated(!updated);
    })().catch((err) => {
      console.log(err);
      setErrorMessage(err.message);
    });
  };

  return (
    <>
      {isForgotPassOpen ? (
        <Container>
          {isSureOpen ? (
            <Wrapper>
              <SettingsHeader>
                <h4>Find your Geotagger account</h4>
                <p>
                  Enter the email, or username associated with your account to
                  change your password.
                </p>
              </SettingsHeader>
              <h5>{ErrorMessage}</h5>
              <form onSubmit={handleForgotPass}>
                <SettingsForm>
                  <SettingsSection>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </SettingsSection>
                  <SettingsSection>
                    <TwoInRow>
                      <button type="submit">Submit</button>
                      <p onClick={closeForgotPasswordModal}>Cancel</p>
                    </TwoInRow>
                  </SettingsSection>
                </SettingsForm>
              </form>
            </Wrapper>
          ) : isForgotPasswordOpen ? (
            <ConfirmationWrapper>
              <SettingsHeader>
                <h5>Check your email</h5>
                <p>
                  The link to reset your password has been sent to your email:{" "}
                  <span>{email}</span>
                </p>
              </SettingsHeader>
              <button onClick={closeForgotPasswordModal}>Close</button>
            </ConfirmationWrapper>
          ) : null}
        </Container>
      ) : null}
    </>
  );
};

export default ForgotPassword;
