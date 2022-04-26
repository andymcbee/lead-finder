import Contact from "../models/contact.js";

//Note: Add contact is in addContact.js due to its size.

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ data: contacts });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
