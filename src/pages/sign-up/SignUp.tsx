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
} from "./SignUp.style";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePicture from "../../assets/DefaultAvatar.png";
import { signUp } from "../../api/UserApi";
import Backgroundimg from "../../assets/background/background-signup-map.svg";
import BackgroundIconImg from "../../assets/icons/logo-icon-border.svg";
import UploadIconImg from "../../assets/icons/upload-white-icon.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(ProfilePicture);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // To prevent refreshing the page on form submit
    (async () => {
      await signUp({
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        name: firstName,
        surname: lastName,
        profilePicture: image!,
      });
      return navigate("/signin");
    })().catch((err) => {
      setErrorMessage(err.response.data.message);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImage(file);
  };

  return (
    <Container>
      <SignUpFormWrapper>
        <SignUpHeader>
          <h3>Sign up</h3>
          <p>Your name will appear on posts and your public profle.</p>
          <h5>{ErrorMessage}</h5>
        </SignUpHeader>
        <form onSubmit={handleSubmit}>
          <SignUpForm>
            <Image>
              <img src={`${preview}`} alt="pp" />
              <Button type="button" onClick={handleUpload}>
              <Icon style={{ backgroundImage: `url(${UploadIconImg})` }} />
              </Button>
              <input
                type="file"
                accept="image/*"
                id="selectImages"
                onChange={(e) => handleChange(e)}
                style={{ display: "none" }}
              />
            </Image>
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
                  type="text"
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </SignUpFormSection>
              <SignUpFormSection>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </SignUpFormSection>
            </TwoInRow>
            <SignUpFormSection>
              {/*TODO: sadd peak password button*/}
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
