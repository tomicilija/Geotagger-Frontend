import axios from "axios";
import {
  Location,
  LocationResponse,
  RandomLocationResponse,
} from "../interfaces/LocationInterfaces";

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
const axiosFileInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

// API calls related to Locations

export const getLocations = async (
  page: number,
  size: number,
  token: string
): Promise<LocationResponse[]> => {
  const response = await axiosInstance.get(
    `/location?page=${page}&size=${size * page}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getMyLocations = async (
  page: number,
  size: number,
  token: string
): Promise<LocationResponse[]> => {
  const response = await axiosInstance.get(
    `/location/me?page=${page}&size=${size * page}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getLocationById = async (
  id: string,
  token: string
): Promise<LocationResponse> => {
  const response = await axiosInstance.get(`/location/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getLocationImage = async (id: string) => {
  const response = await axiosFileInstance.get(`/location/image/${id}`, {
    responseType: "blob",
  });
  return response.data;
};

export const getRandomLocationsId = async (): Promise<
  RandomLocationResponse[]
> => {
  const response = await axiosInstance.get(`/location/random`, {});
  return response.data;
};

export const postLocation = async (
  location: Location,
  token: string
) => {
  const response = await axiosFileInstance.post("/location", location, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateLocation = async (
  id: string,
  location: Location,
  token: string
) => {
  const response = await axiosFileInstance.patch(`/location/${id}`, location, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteLocation = async (
  id: string,
  token: string
) => {
  const response = await axiosInstance.delete(`/location/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
