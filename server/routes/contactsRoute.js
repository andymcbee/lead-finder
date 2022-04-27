import express from "express";

import { addContact } from "../controllers/addContact.js";
import { getContacts } from "../controllers/contacts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addContact);
router.get("/", auth, getContacts);

export default router;
