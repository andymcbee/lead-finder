import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const createContact = (newContact) => API.post("/contacts", newContact);

export const getContacts = (accountId) => API.get(`/contacts/${accountId}`);

// user auth

export const signup = (formData) => API.post("/user/signup", formData);

export const signin = (formData) => API.post("/user/signin", formData);

export const resetPassword = (formData) =>
  API.post("/user/reset-password", formData);

export const setNewPassword = (data) => API.post("/user/set-password", data);
