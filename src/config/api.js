import axios from "axios";

export const noFileURL = "https://waysbook-backend.herokuapp.com//uploads/-";

export const API = axios.create({
  baseURL: "https://waysbook-backend.herokuapp.com/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
