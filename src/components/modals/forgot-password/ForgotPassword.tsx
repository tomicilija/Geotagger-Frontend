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
  Warning,
} from "./ForgotPassword.style";
import PlaceholderImage from "../../../assets/default-avatar.svg";
import { deleteLocation } from "../../../api/LocationApi";
import { forgotPassword } from "../../../api/UserApi";
import { Label, Input } from "reactstrap";
import * as yup from "yup";

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

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState<{ [field: string]: string }>({});

  useEffect(() => {
    setIsForgotPassOpen(JSON.parse(forgotPasswordModal!) === true);
    setIsSureOpen(JSON.parse(forgotPasswordModal!) === true);
  }, [forgotPasswordModal, updated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForgotPass = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // To prevent refreshing the page on form submit
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      (async () => {
        await forgotPassword({
          email: formData.email,
        });
        setIsSureOpen(false);
        setForgotPasswordOpen(true);
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
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </SettingsSection>
                  {errors.email && <Warning>{errors.email}</Warning>}
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
