import axios from "axios";

const api = axios.create({
  baseURL: "https://icisct26.azurewebsites.net/api",
  withCredentials: true,
});

export default api;
