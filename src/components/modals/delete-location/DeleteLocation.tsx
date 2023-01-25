import { useContext, useEffect, useState } from "react";
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
import { deleteLocation } from "../../../api/LocationApi";

const DeleteLocation = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const [ErrorMessage, setErrorMessage] = useState("");
  const { updated, setUpdated } = useContext(UpdateContext);
  const [isDeletedOpen, setDeletedOpen] = useState<boolean>(true);
  const [isSureOpen, setIsSureOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const deleteModal = localStorage.getItem("isDeleteModalOpen");
  const locationId = localStorage.getItem("deleteLocationId");

  useEffect(() => {
    setIsSureOpen(JSON.parse(deleteModal!) === true);
    setIsDeleteOpen(JSON.parse(deleteModal!) === true);
  }, [deleteModal, updated]);

  const handleDelete = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // To prevent refreshing the page on form submit
    (async () => {
      await deleteLocation(locationId!, JSON.parse(isLoggedIn!));
      setIsSureOpen(false);
      setDeletedOpen(true);
    })().catch((err) => {
      setErrorMessage(err.response.data.message);
    });
  };

  const closeDeleteModal = () => {
      setIsSureOpen(false);
      setDeletedOpen(false);
      setIsDeleteOpen(false);
      localStorage.setItem("isDeleteModalOpen", "false");
      setUpdated(!updated);
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
              <h5>{ErrorMessage}</h5>
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
