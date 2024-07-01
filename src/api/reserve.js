import axios from "axios";

const BASE_URL = import.meta.env.API_URL;

const reserveRequest = axios.create({
  baseURL: `${BASE_URL}/v1/reserve`,
});

export const getReserve = (params) =>
  reserveRequest.get("/reserve", { params: params });
export const postReserve = (data) => 
  reserveRequest.post("/reserve", data);
export const putReserve = (data, params) =>
  reserveRequest.put("/reserve", { params: params }, data);
export const deleteReserve = (params) =>
  reserveRequest.delete("/reserve", { params: params });

export const getReserveItems = () => 
  reserveRequest.get("/items");
export const getReserveItem = (params) =>
  reserveRequest.get("/item", { params: params });

export const getReserveSpaces = () => 
  reserveRequest.get("/Spaces");
export const getReserveSpace = (params) =>
  reserveRequest.get("/Space", { params: params });

export const getReserveItemAvailableTime = (params) =>
  reserveRequest.get("/item_available_time", { params, params });
export const getReserveSpaceAvailableTime = (params) =>
  reserveRequest.get("/space_available_time", { params, params });

export const getReserveVerify = (params) =>
  reserveRequest.get("/verify", { params, params });
