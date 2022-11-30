import { FC, useContext, useEffect, useState } from "react"; /*
import { deleteUser, getSignedInUser, signIn, updateUser } from "../../../api/UserApi";*/
import { DeleteLocationProps } from "../../../interfaces/LocationInterfaces";
import { UpdateContext } from "../../../utils/UpdateContext";
import {
  Container,
  Wrapper,
  SettingsHeader,
  SettingsForm,
  SettingsSection,
  TwoInRow,
  ConfirmationWrapper,
} from "./DeleteLocation.style";
import PlaceholderImage from "../../../assets/default-avatar.svg";

// Updating loggedin user information and deleteing loggedin user using modal, that overlays whole page

const DeleteLocation = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const { updated, setUpdated } = useContext(UpdateContext);

  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>(PlaceholderImage);

  const [isDeletedOpen, setDeletedOpen] = useState<boolean>(true);
  const [isSureOpen, setIsSureOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  
  const deleteModal = localStorage.getItem("isDeleteModalOpen");

  useEffect(() => {
    setIsSureOpen(JSON.parse(deleteModal!) === true);
    setIsDeleteOpen(JSON.parse(deleteModal!) === true);
  }, [deleteModal, updated]);

  /*
  useEffect(() => {
    getSignedInUser(JSON.parse(isLoggedIn!))
      .then(({ email, name, surname, id }) => {
        setEmail(email);
        setFirstName(name);
        setLastName(surname);
      })
      .catch((e) => {
        console.log("Error: Cant get user. \n" + e);
      });
  });*/

  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // To prevent refreshing the page on form submit

    (async () => {
      /*
      await updateUser(
        {
          email: newEmail,
          pass: newPassword,
          passConfirm: newPasswordConfirm,
          name: newFirstName,
          surname: newLastName,
        },
        JSON.parse(isLoggedIn!)
      );
      const result = await signIn({ email: newEmail, pass: newPassword });
      localStorage.setItem(
        "accessToken",
        JSON.stringify(result["accessToken"])
      );
      setUpdated(!updated);*/
      setIsSureOpen(false);
      setDeletedOpen(true);
    })().catch((err) => {
      setErrorMessage(err.response.data.message);
    });
  };

  const closeDeleteModal = async () => {
    (async () => {
      setIsSureOpen(false);
      setDeletedOpen(false);
      setIsDeleteOpen(false);
      localStorage.setItem("isDeleteModalOpen", "false");
    })().catch((err) => {
      console.log(err);
      setErrorMessage(err.message);
    });
  };

  return (
    <>
      {isDeleteOpen ? (
        <Container>
          {isSureOpen ? (
            <Wrapper>
              <SettingsHeader>
                <h4>Are you sure?</h4>
                <p>
                  This location will be deleted. There is no undo of this
                  action.
                </p>
              </SettingsHeader>
              {/* <DefaultProfilePicture /> */}
              <form onSubmit={handleDelete}>
                <SettingsForm>
                  <SettingsSection>
                    <TwoInRow>
                      <button type="submit">Submit</button>
                      <p onClick={closeDeleteModal}>Cancel</p>
                    </TwoInRow>
                  </SettingsSection>
                </SettingsForm>
              </form>
            </Wrapper>
          ) : isDeletedOpen ? (
            <ConfirmationWrapper>
              <SettingsHeader>
                <h5>Your location was deleted.</h5>
              </SettingsHeader>
              <button onClick={closeDeleteModal}>Close</button>
            </ConfirmationWrapper>
          ) : null}
        </Container>
      ) : null}
    </>
  );
};

export default DeleteLocation;