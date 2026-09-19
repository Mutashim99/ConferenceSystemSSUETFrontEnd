import axios from "axios";

const api = axios.create({
  baseURL: "https://seahorse-app-tek3s.ondigitalocean.app/api",
  withCredentials: true,
});

export default api;
