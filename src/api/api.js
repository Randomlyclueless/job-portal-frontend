import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const setAuthCredentials = (username, password) => {
  api.defaults.auth = {
    username,
    password,
  };
};

export const clearAuthCredentials = () => {
  delete api.defaults.auth;
};

export default api;