import axios from "axios";
import {
  Login,
  LoginResponse,
  Register,
  UpdatePassword,
  UpdateProfilePicture,
  UpdateUser,
  User,
} from "../interfaces/LocationInterfaces";

const axiosInstance = axios.create({ baseURL: "http://localhost:5000/" });
const axiosFileInstance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { "Content-Type": "multipart/form-data" },
});

// API calls related to User

export const signUp = async (user: Register): Promise<string> => {
  const response = await axiosFileInstance.post("/register", user);
  return response.data;
};

export const signIn = async (user: Login): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/login", user);
  return response.data;
};

export const getSignedInUser = async (token: string): Promise<User> => {
  const response = await axiosInstance.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserProfilePicture = async (id: string, token: string) => {
  const response = await axiosFileInstance.get(`/me/profilepicture/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob'
  });
  return response.data;
};

export const getUserById = async (id: string, token: string): Promise<User> => {
  const response = await axiosInstance.get(`/me/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUser = async (
  user: UpdateUser,
  token: string
): Promise<void> => {
  const response = await axiosInstance.patch("/me/update-user", user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfilePicture = async (
  user: UpdateProfilePicture,
  token: string
): Promise<void> => {
  const response = await axiosFileInstance.patch("/me/update-profilepicture", user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updatePassword = async (
  user: UpdatePassword,
  token: string
): Promise<void> => {
  const response = await axiosInstance.patch("/me/update-password", user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteUser = async (token: string): Promise<void> => {
  const response = await axiosInstance.delete("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
