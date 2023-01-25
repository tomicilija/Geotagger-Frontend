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
  Warning,
  Peek,
  PeekImg,
} from "./SignIn.style";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../api/UserApi";
import Backgroundimg from "../../assets/background/background-signup-map.svg";
import BackgroundIconImg from "../../assets/icons/logo-icon-border.svg";
import { UpdateContext } from "../../utils/UpdateContext";
import ForgotPassword from "../../components/modals/forgot-password/ForgotPassword";
import PeekIconImg from "../../assets/icons/peek-icon.svg";
import { Label, Input } from "reactstrap";
import * as yup from "yup";

const SignIn = () => {
  const navigate = useNavigate();
  const [ErrorMessage, setErrorMessage] = useState("");
  const { updated, setUpdated } = useContext(UpdateContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [field: string]: string }>({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Password is too weak (Must contain: at least 1 upper case letter, least 1 lower case letter, 1 number or special character)"
      )
      .required("Password is required"),
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      (async () => {
        const result = await signIn({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem(
          "accessToken",
          JSON.stringify(result["accessToken"])
        );
        return navigate("/profile");
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
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </SignInFormSection>
            {errors.email && <Warning>{errors.email}</Warning>}
            <SignInFormSection>
              {/*TODO: add peek password button*/}
              <Label for="password">Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
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
            </SignInFormSection>
            {errors.password && <Warning>{errors.password}</Warning>}
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
