import { useContext, useEffect, useState } from "react"; 
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
import { forgotPassword } from "../../../api/UserApi";
import { Label, Input } from "reactstrap";
import * as yup from "yup";

const ForgotPassword = () => {
  const [email] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const { updated, setUpdated } = useContext(UpdateContext);

  const [isForgotPasswordOpen, setForgotPasswordOpen] =
    useState<boolean>(false);
  const [isSureOpen, setIsSureOpen] = useState<boolean>(false);
  const [isForgotPassOpen, setIsForgotPassOpen] = useState<boolean>(false);
  const forgotPasswordModal = localStorage.getItem("isForgotPasswordModalOpen");
  const [errors, setErrors] = useState<{ [field: string]: string }>({});
  const [formData, setFormData] = useState({
    email: "",
  });

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  useEffect(() => {
    setIsForgotPassOpen(JSON.parse(forgotPasswordModal!) === true);
    setIsSureOpen(JSON.parse(forgotPasswordModal!) === true);
  }, [forgotPasswordModal, updated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForgotPass = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
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

  const closeForgotPasswordModal = () => {
      setIsSureOpen(false);
      setForgotPasswordOpen(false);
      setIsForgotPassOpen(false);
      localStorage.setItem("isForgotPasswordModalOpen", "false");
      setUpdated(!updated);
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
