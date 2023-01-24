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
  Buttons,
  Icon,
  Warning,
  Peek,
  PeekImg,
} from "./SignUp.style";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePicture from "../../assets/DefaultAvatar.png";
import { signUp } from "../../api/UserApi";
import Backgroundimg from "../../assets/background/background-signup-map.svg";
import BackgroundIconImg from "../../assets/icons/logo-icon-border.svg";
import UploadIconImg from "../../assets/icons/upload-white-icon.png";
import PeekIconImg from "../../assets/icons/peek-icon.svg";
import { Label, Input } from "reactstrap";
import * as yup from "yup";

const SignUp = () => {
  const navigate = useNavigate();
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [field: string]: string }>({});

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(ProfilePicture);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    surname: "",
    profilePicture: null,
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
    name: yup.string().required("Name is required"),
    surname: yup.string().required("Surname is required"),
    profilePicture: yup
      .mixed()
      .test(
        "fileFormat",
        "Unsupported file format",
        (value) =>
          value &&
          value.type.match(
            /^image\/(jpeg|jpg|png|gif|tif|pjp|apng|ico|bmp|titf|jfif|svg)$/
          )
      )
      .required("Profile picture is required"),
  });

  useEffect(() => {
    if (formData.profilePicture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(formData.profilePicture);
    }
  }, [formData.profilePicture]);

  const handleUpload = async () => {
    document.getElementById("profilePicture")!.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files![0]);
    setFormData({ ...formData, [event.target.name]: event.target.files![0]! });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      (async () => {
        await signUp({
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
          name: formData.name,
          surname: formData.surname,
          profilePicture: image!,
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
          <h3>Sign up</h3>
          <p>Your name will appear on posts and your public profle.</p>
          <h5>{ErrorMessage}</h5>
        </SignUpHeader>
        <form onSubmit={handleSubmit}>
          <SignUpForm>
            <Image>
              <img src={`${preview}`} alt="pp" />
              <Buttons type="button" onClick={handleUpload}>
                <Icon style={{ backgroundImage: `url(${UploadIconImg})` }} />
              </Buttons>
              <Input
                type="file"
                name="profilePicture"
                id="profilePicture"
                onChange={handleChangeImage}
                style={{ display: "none" }}
              />
            </Image>
            {errors.profilePicture && (
              <Warning>{errors.profilePicture}</Warning>
            )}
            <SignUpFormSection>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </SignUpFormSection>
            {errors.email && <Warning>{errors.email}</Warning>}
            <TwoInRow>
              <SignUpFormSection>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </SignUpFormSection>
              <SignUpFormSection>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  name="surname"
                  id="surname"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </SignUpFormSection>
            </TwoInRow>
            <TwoInRow>
              {errors.name && <Warning>{errors.name}</Warning>}
              {errors.surname && <Warning>{errors.surname}</Warning>}
            </TwoInRow>
            <SignUpFormSection>
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
            </SignUpFormSection>
            {errors.password && <Warning>{errors.password}</Warning>}
            <SignUpFormSection>
              <Label for="confirmPassword">Confirm Password</Label>
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
