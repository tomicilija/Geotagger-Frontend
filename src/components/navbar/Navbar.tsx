import { useContext, useEffect, useState, useCallback } from "react";
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
import { ReactComponent as AddPicture } from "../../assets/icons/add.svg";
import ProfileSettings from "../modals/profile-settings/ProfileSettings";
import { UpdateContext } from "../../utils/UpdateContext";
import DeleteLocation from "../modals/delete-location/DeleteLocation";
import { getSignedInUser, getUserProfilePicture } from "../../api/UserApi";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  let location = useLocation();
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
  });
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const [image, setImage] = useState<string>();

  const { updated } = useContext(UpdateContext);

  const openSettingsModal = () => {
    setIsSettingsModalOpen((prev) => !prev);
  };

  const getData = useCallback(async () => {
    if (isLoggedIn) {
      const [user, profilePicture] = await Promise.all([
        getSignedInUser(JSON.parse(isLoggedIn)),
        getUserProfilePicture(userData.id, JSON.parse(isLoggedIn)),
      ]);
      setUserData({
        id: user.id,
        firstName: user.name,
        lastName: user.surname,
      });

      const url = window.URL || window.webkitURL;
      const blobUrl = url.createObjectURL(profilePicture);
      setImage(blobUrl);
    }
  }, [isLoggedIn, userData.id]);

  useEffect(() => {
    getData().catch((e) => {
      console.log("Error: Cant get data. \n" + e);
    });
  }, [updated, isLoggedIn, getData]);

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
                      {userData.firstName} {userData.lastName}
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
