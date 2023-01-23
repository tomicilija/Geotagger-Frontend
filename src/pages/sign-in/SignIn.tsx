import {
  Container,
  Background,
  SignInFormWrapper,
  SignInHeader,
  SignInForm,
  SignInFormSection,
  SigninText,
  BackgroundIcon,
  ForgotPass,
} from "./SignIn.style";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../api/UserApi";
import Backgroundimg from "../../assets/background/background-signup-map.svg";
import BackgroundIconImg from "../../assets/icons/logo-icon-border.svg";
import { UpdateContext } from "../../utils/UpdateContext";
import ForgotPassword from "../../components/modals/forgot-password/ForgotPassword";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const { updated, setUpdated } = useContext(UpdateContext);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState<boolean>(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // To prevent refreshing the page on form submit
    (async () => {
      const result = await signIn({ email: email, password: password });
      localStorage.setItem(
        "accessToken",
        JSON.stringify(result["accessToken"])
      );
      setUpdated(!updated);
      return navigate("/profile");
    })().catch((err) => {
      setErrorMessage(err.response.data.message);
    });
  };
  const openForgotPasswordModal = () => {
    localStorage.setItem("isForgotPasswordModalOpen", "true");
    setUpdated(!updated);
  };

  return (
    <Container>
      <SignInFormWrapper>
        <SignInHeader>
          <h3>Sign in</h3>
          <p>Welcome back to Geotagger. We are glad that you are back.</p>
          <h5>{ErrorMessage}</h5>
        </SignInHeader>
        <form onSubmit={handleSubmit}>
          <SignInForm>
            <SignInFormSection>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </SignInFormSection>
            <SignInFormSection>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </SignInFormSection>
            <SignInFormSection>
              <button type="submit">Sign in</button>
            </SignInFormSection>
          </SignInForm>
          <SigninText>
            Do you want to create an account?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <p>Sign Up</p>
            </Link>
          </SigninText>
          <ForgotPass>
            <p onClick={openForgotPasswordModal}>Forgot password?</p>
          </ForgotPass>
        </form>
      </SignInFormWrapper>
        <ForgotPassword />
      <Background style={{ backgroundImage: `url(${Backgroundimg})` }}>
        <BackgroundIcon
          style={{ backgroundImage: `url(${BackgroundIconImg})` }}
        />
      </Background>
    </Container>
  );
};

export default SignIn;
