export interface MyQuote {
  userid: string;
  text: string;
  karma: number;
  creation_date: string;
}

export interface QuoteResponse {
  userid: string;
  karma: number;
  text: string;
  name: string;
  surname: string;
}

export interface Register {
  email: string;
  pass: string;
  passConfirm: string;
  name: string;
  surname: string;
}

export interface Login {
  email: string;
  pass: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface CardNewProps {
  locationid?: string;
  image?: string;
}

export interface CardGuessedProps {
  locationid?: string;
  image?: string;
  distance?: number;
}

export interface CardLockedProps {
  image: string;
}

export interface CardEditProps {
  locationid: string;
  image: string;
}

export interface GridProps {
  locations: {
    locationid?: string;
    image?: string;
    distance?: number;
  }[];
}

export interface DeleteLocationProps {
  isDeleteOpen: boolean;
  setIsDeleteOpen: (isQuoteOpen: boolean) => void;
}

export interface ProfileSettingsProps {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (isSettingsOpen: boolean) => void;
}