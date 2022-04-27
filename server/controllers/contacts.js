import Contact from "../models/contact.js";

//Note: Add contact is in addContact.js due to its size.

export const getContacts = async (req, res) => {
  const accountId = req.params.accountId;
  try {
    const contacts = await Contact.find({ accountId: accountId });
    res.status(200).json({ data: contacts });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
