import {
  Container,
  Background,
  SignInFormWrapper,
  SignInHeader,
  SignInForm,
  SignInFormSection,
  TwoInRow,
  SigninText,
  BackgroundIcon,
} from "./SignIn.style";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { signUp } from "../../api/UserApi";
import Backgroundimg from "../../assets/background/background-signup-map.svg";
import BackgroundIconImg from "../../assets/icons/logo-icon-border.svg";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  /*
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // To prevent refreshing the page on form submit
    (async () => {
      await signUp({
        email: email,
        pass: password,
        passConfirm: passwordConfirm,
        name: firstName,
        surname: lastName,
      });
      return navigate("/signin");
    })().catch((err) => {
      setErrorMessage(err.response.data.message);
    });
  };
*/
  return (
    <Container>
      <SignInFormWrapper>
        <SignInHeader>
          <h3>Sign in</h3>
          <p>Welcome back to Geotagger. We are glad that you are back.</p>
          <h5>{ErrorMessage}</h5>
        </SignInHeader>
        <form>
          {/*onSubmit={handleSubmit}*/}
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
        </form>
      </SignInFormWrapper>
      <Background style={{ backgroundImage: `url(${Backgroundimg})` }}>
        <BackgroundIcon
          style={{ backgroundImage: `url(${BackgroundIconImg})` }}
        ></BackgroundIcon>
      </Background>
    </Container>
  );
};

export default SignIn;
