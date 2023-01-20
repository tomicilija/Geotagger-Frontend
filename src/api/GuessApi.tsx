import axios from "axios";
import {
  Guess,
  GuessResponse,
  GuessResponseById,
} from "../interfaces/LocationInterfaces";

const axiosInstance = axios.create({ baseURL: "http://localhost:5000/" });
const axiosFileInstance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { "Content-Type": "multipart/form-data" },
});

// API calls related to Guesses

export const getGuessesByLocationId = async (
  id: string,
  token: string
): Promise<GuessResponseById[]> => {
  const response = await axiosInstance.get(`/location/guess/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMyGuesses = async (token: string): Promise<GuessResponse[]> => {
  const response = await axiosInstance.get(`/location/guesses/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const guessLocation = async (
  guess: Guess,
  token: string
): Promise<GuessResponse> => {
  const response = await axiosInstance.post(`/location/guess/${guess.id}`, guess, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
