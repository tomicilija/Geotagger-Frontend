import axios from "axios";
import { Location, LocationResponse } from "../interfaces/LocationInterfaces";

const axiosInstance = axios.create({ baseURL: "http://localhost:5000/" });
const axiosFileInstance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { "Content-Type": "multipart/form-data" },
});

// API calls related to Locations

export const getLocations = async (token: string): Promise<LocationResponse[]> => {
  const response = await axiosInstance.get("/location", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMyLocations = async (token: string): Promise<LocationResponse[]> => {
  const response = await axiosInstance.get("/location/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getLocationImage = async (id: string, token: string) => {
  const response = await axiosFileInstance.get(`/location/image/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob'
  });
  return response.data;
};

export const postLocation = async (
  location: Location,
  token: string
): Promise<void> => {
  const response = await axiosFileInstance.post(
    "/location",
    location,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const updateLocation = async (
  location: Location,
  token: string
): Promise<void> => {
  const response = await axiosInstance.patch(
    "/location",
    location,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const deleteLocation = async (token: string): Promise<void> => {
  const response = await axiosInstance.delete("/location", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
