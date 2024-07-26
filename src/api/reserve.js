import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const reserveRequest = axios.create({
  baseURL: `${API_URL}/v1/reserve`,
});

export const getReserve = (id) =>
  reserveRequest.get(`/reserve/${id}`,id);
export const postReserve = (data) => 
  reserveRequest.post("/reserve", data);
export const putReserve = (data, id) =>
  reserveRequest.put((`/reserve/${id}`,id), data);
export const deleteReserve = (id) =>
  reserveRequest.delete(`/reserve/${id}`,id);

export const getReserveItems = () => 
  reserveRequest.get("/items");
export const getReserveItem = (id) =>
  reserveRequest.get(`/item/${id}`,id);

export const getReserveSpaces = () => 
  reserveRequest.get("/Spaces");
export const getReserveSpace = (id) =>
  reserveRequest.get(`/Space"/${id}`,id);

export const getReserveItemAvailableTime = (params) =>
  reserveRequest.get(`/item_available_time`,{params:params});
export const getReserveSpaceAvailableTime = (params) =>
  reserveRequest.get(`/space_available_time`,{params:params});

export const getReserveVerify = (id) =>
  reserveRequest.get(`/verify/${id}`,id);
