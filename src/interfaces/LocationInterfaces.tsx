export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  image: File;
}

export interface LocationResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  latitude: number;
  longitude: number;
  image: File;
  user_id: string;
}

export interface Guess {
  id: string;
  latitude: number;
  longitude: number;
}

export interface GuessResponseById {
  id: string;
  createdAt: string;
  distance: number;
  profilePicture?: string;
  user: { id: string; name: string; surname: string; profilePicture: string };
}

export interface GuessResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  distance: number;
  user_id: string;
  location_id: string;
}

export interface Register {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  surname: string;
  profilePicture: File;
}

export interface Login {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
}

export interface UpdateUser {
  email: string;
  name: string;
  surname: string;
}

export interface UpdateProfilePicture {
  profilePicture: File;
}

export interface UpdatePassword {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}

export interface ForgotPassword {
  email: string;
}

export interface ResetPassword {
  email: string;
  token: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface CardNewProps {
  locationid: string;
}

export interface CardGuessedProps {
  locationid?: string;
  image?: string;
  distance?: number;
}

export interface CardLockedProps {
  locationid: string;
}

export interface CardEditProps {
  locationid: string;
}

export interface GridProps {
  locationId: string[];
  cardStyle: string;
}

export interface DeleteLocationProps {
  isDeleteOpen: boolean;
  setIsDeleteOpen: (isQuoteOpen: boolean) => void;
}

export interface ProfileSettingsProps {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (isSettingsOpen: boolean) => void;
}

export interface ForgotPasswordProps {
  isForgotPasswordOpen: boolean;
  setIsForgotPassword: (isForgotPassword: boolean) => void;
}
