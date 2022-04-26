import express from "express";

import { addContact } from "../controllers/addContact.js";
import { getContacts } from "../controllers/contacts.js";

const router = express.Router();

router.post("/", addContact);
router.get("/", getContacts);

export default router;
