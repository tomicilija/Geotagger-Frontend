import {
  Container,
  Background,
  SignUpFormWrapper,
  SignUpHeader,
  SignUpForm,
  SignUpFormSection,
  TwoInRow,
  SigninText,
  BackgroundIcon,
} from "./SignUp.style";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as DefaultProfilePicture } from "../../assets/default-avatar.svg";
//import { signUp } from "../../api/UserApi";
import Backgroundimg from "../../assets/background/background-signup-map.svg";
import BackgroundIconImg from "../../assets/icons/logo-icon-border.svg";

const SignUp = () => {
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
      <SignUpFormWrapper>
        <SignUpHeader>
          <h3>Sign up</h3>
          <p>Your name will appear on posts and your public profle.</p>
          <h5>{ErrorMessage}</h5>
        </SignUpHeader>
        <DefaultProfilePicture />
        <form>
          {/*onSubmit={handleSubmit}*/}
          <SignUpForm>
            <SignUpFormSection>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </SignUpFormSection>
            <TwoInRow>
              <SignUpFormSection>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="firstname"
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </SignUpFormSection>
              <SignUpFormSection>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="lastname"
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </SignUpFormSection>
            </TwoInRow>
            <SignUpFormSection>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </SignUpFormSection>
            <SignUpFormSection>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                value={passwordConfirm}
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </SignUpFormSection>
            <SignUpFormSection>
              <button type="submit">Sign up</button>
            </SignUpFormSection>
          </SignUpForm>
          <SigninText>
            Already have an account?
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <p>Sign In</p>
            </Link>
          </SigninText>
        </form>
      </SignUpFormWrapper>
      <Background style={{ backgroundImage: `url(${Backgroundimg})` }}>
        <BackgroundIcon
          style={{ backgroundImage: `url(${BackgroundIconImg})` }}
        />
      </Background>
    </Container>
  );
};

export default SignUp;
