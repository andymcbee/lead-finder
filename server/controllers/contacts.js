import Contact from "../models/contact.js";

//Note: Add contact is in addContact.js due to its size.

export const getContacts = async (req, res) => {
  console.log("GET CONTACTS REQ:::");
  const { accountId } = req.params;
  console.log("ACCOUNT ID:::::::::");
  console.log(accountId);
  try {
    const contacts = await Contact.find({ accountId: accountId });
    console.log("Contacts:::::::::::");
    console.log(contacts);
    res.status(200).json({ data: contacts });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
