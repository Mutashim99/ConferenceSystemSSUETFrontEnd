import axios from "axios";

const api = axios.create({
  baseURL: "https://conference-g9dqcxa9daccaygk.southindia-01.azurewebsites.net/api",
  withCredentials: true,
});

export default api;
