import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const createContact = (newContact) => API.post("/contacts", newContact);

export const getContacts = () => API.get("/contacts");

// sign up

export const signup = (formData) => API.post("/user/signup", formData);

export const signin = (formData) => API.post("/user/signin", formData);
