import { useContext, useEffect, useState } from "react";
import {
  Container,
  Logo,
  Menu,
  Home,
  ButtonWrapper,
  Button,
  ButtonLoggedin,
  MobileLink,
  DesktopLink,
  BurgerMenu,
  AddMobile,
  BorderlessButton,
  IconWrapper,
  Wrapper,
  ProfilePicture,
} from "./Navbar.style";
import { useLocation, Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../../assets/icons/navbar-logo.svg";
import { ReactComponent as RightArrow } from "../../assets/arrows/rightArrow.svg";
import { ReactComponent as RightArrowGreen } from "../../assets/arrows/rightArrow-green.svg";
import { ReactComponent as DefaultProfileIcon } from "../../assets/icons/profile.svg";
import { ReactComponent as AddPicture } from "../../assets/icons/add.svg";
import ProfileSettings from "../modals/profile-settings/ProfileSettings";
import DeleteQuote from "../modals/delete-location/DeleteLocation";
import { UpdateContext } from "../../utils/UpdateContext";
import DeleteLocation from "../modals/delete-location/DeleteLocation";
import { getSignedInUser, getUserProfilePicture } from "../../api/UserApi";

/*
 * Navigation bar switches pages, opens modals, and is shown in few different views:
 * Signup and Signin pages
 * Landing page with and without logged in user
 * Profile page with white quotastic logo
 * Mobile page with and without logged in user
 */

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  let location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userid, setUserId] = useState("");
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);

  const [image, setImage] = useState<string>();

  const openSettingsModal = () => {
    setIsSettingsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await getSignedInUser(JSON.parse(isLoggedIn));
        setFirstName(response.name);
        setLastName(response.surname);
        setUserId(response.id);
      })().catch((e) => {
        console.log("Error: Cant get user. \n" + e);
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await getUserProfilePicture(
          userid,
          JSON.parse(isLoggedIn)
        );
        const url = window.URL || window.webkitURL;
        const blobUrl = url.createObjectURL(response);
        setImage(blobUrl);
      })().catch((e) => {
        console.log("Error: Cant get user profile picture. \n" + e);
      });
    }
  }, [isLoggedIn, userid]);

  return (
    <Container>
      <Wrapper>
        <Logo className={isBurgerMenuOpen ? "hideLogo" : "showLogo"}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <LogoIcon />
          </Link>
        </Logo>
        <BurgerMenu onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}>
          <span className={isBurgerMenuOpen ? "xmark" : "burger"}></span>
          <span className={isBurgerMenuOpen ? "xmark" : "burger"}></span>
          <span className={isBurgerMenuOpen ? "xmark" : "burger"}></span>
        </BurgerMenu>
        {isLoggedIn ? (
          <>
            <AddMobile
              className={isBurgerMenuOpen ? "hideButton" : "showButton"}
            >
              <Link to="/location/add" style={{ textDecoration: "none" }}>
                <AddPicture />
              </Link>
            </AddMobile>
            <Menu className={isBurgerMenuOpen ? "showMenuNav" : "hideMenuNav"}>
              <ButtonWrapper>
                <Link
                  to="/profile"
                  onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
                  style={{ textDecoration: "none" }}
                >
                  <MobileLink>
                    <ProfilePicture>
                      <img src={`${image}`} alt="pp" />
                    </ProfilePicture>
                    <h5>
                      {firstName} {lastName}
                    </h5>
                  </MobileLink>
                </Link>
                <br />
                <div>
                  <Link
                    to="/"
                    onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
                    style={{ textDecoration: "none" }}
                  >
                    <MobileLink>
                      <h5>Home</h5>
                      <RightArrow />
                    </MobileLink>
                  </Link>
                </div>
                <div onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}>
                  <MobileLink onClick={openSettingsModal}>
                    <h5>Profile settings</h5>
                    <RightArrow />
                  </MobileLink>
                </div>
                <MobileLink
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  <h5>
                    <span>Logout</span>
                  </h5>
                  <RightArrowGreen />
                </MobileLink>

                <Link to="/" style={{ textDecoration: "none" }}>
                  <DesktopLink>
                    <p>Home</p>
                  </DesktopLink>
                </Link>
                <DesktopLink onClick={openSettingsModal}>
                  <p>Profile settings</p>
                </DesktopLink>
                <DesktopLink
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  <p>Logout</p>
                </DesktopLink>
                <IconWrapper>
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <ButtonLoggedin>
                      <ProfilePicture>
                        <img src={`${image}`} alt="pp" />
                      </ProfilePicture>
                    </ButtonLoggedin>
                  </Link>
                  <Link to="/location/add" style={{ textDecoration: "none" }}>
                    <ButtonLoggedin>
                      <AddPicture />
                    </ButtonLoggedin>
                  </Link>
                </IconWrapper>
              </ButtonWrapper>
            </Menu>
            <ProfileSettings
              isSettingsOpen={isSettingsModalOpen}
              setIsSettingsOpen={setIsSettingsModalOpen}
            />
            <DeleteLocation />
          </>
        ) : (
          <Menu className={isBurgerMenuOpen ? "showMenuNav" : "hideMenuNav"}>
            <ButtonWrapper>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Home onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}>
                  <h5>Home</h5>
                  <RightArrow />
                </Home>
              </Link>
              {location.pathname === "/" ? (
                <>
                  <Link to="/signin" style={{ textDecoration: "none" }}>
                    <BorderlessButton className="signin">
                      Sign in
                    </BorderlessButton>
                  </Link>
                  <p>or</p>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Button className="signup">Sign up</Button>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </ButtonWrapper>
          </Menu>
        )}
      </Wrapper>
    </Container>
  );
};
export default Navbar;
