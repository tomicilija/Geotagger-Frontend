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
  Image,
  Button,
  Icon,
} from "./ResetPassword.style";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword, signUp } from "../../api/UserApi";
import Backgroundimg from "../../assets/background/background-signup-map.svg";
import BackgroundIconImg from "../../assets/icons/logo-icon-border.svg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // To prevent refreshing the page on form submit
    (async () => {
      await resetPassword({
        email: email,
        token: id!,
        password: password,
        passwordConfirm: passwordConfirm,
      });
      return navigate("/signin");
    })().catch((err) => {
      setErrorMessage(err.response.data.message);
    });
  };

  return (
    <Container>
      <SignUpFormWrapper>
        <SignUpHeader>
          <h3>Reset password</h3>
          <p>Enter your email and choose your new password</p>
          <h5>{ErrorMessage}</h5>
        </SignUpHeader>
        <form onSubmit={handleSubmit}>
          <SignUpForm>
            <SignUpFormSection>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </SignUpFormSection>
            <SignUpFormSection>
              {/*TODO: sadd peak password button*/}
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </SignUpFormSection>
            <SignUpFormSection>
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                value={passwordConfirm}
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </SignUpFormSection>
            <SignUpFormSection>
              <button type="submit">Reset password</button>
            </SignUpFormSection>
          </SignUpForm>
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

export default ResetPassword;
