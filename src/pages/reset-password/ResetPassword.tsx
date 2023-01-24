import {
  Container,
  Background,
  SignUpFormWrapper,
  SignUpHeader,
  SignUpForm,
  SignUpFormSection,
  BackgroundIcon,
  Warning,
  Peek,
  PeekImg,
} from "./ResetPassword.style";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api/UserApi";
import Backgroundimg from "../../assets/background/background-signup-map.svg";
import BackgroundIconImg from "../../assets/icons/logo-icon-border.svg";
import PeekIconImg from "../../assets/icons/peek-icon.svg";
import { Label, Input } from "reactstrap";
import * as yup from "yup";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [field: string]: string }>({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
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
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); 
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      (async () => {
        await resetPassword({
          email: formData.email,
          token: id!,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
        });
        return navigate("/signin");
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
              <Label for="email">Your Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </SignUpFormSection>
            {errors.email && <Warning>{errors.email}</Warning>}
            <SignUpFormSection>
              {/*TODO: add peek password button*/}
              <Label for="password">New Password</Label>
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
            </SignUpFormSection>
            {errors.password && <Warning>{errors.password}</Warning>}
            <SignUpFormSection>
              <Label for="confirmPassword">Confirm New Password</Label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="passwordConfirm"
                id="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
              <Peek
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <PeekImg
                  className={showConfirmPassword ? "seen" : "hidden"}
                  style={{ backgroundImage: `url(${PeekIconImg})` }}
                />
              </Peek>
            </SignUpFormSection>
            {errors.passwordConfirm && (
              <Warning>{errors.passwordConfirm}</Warning>
            )}
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
