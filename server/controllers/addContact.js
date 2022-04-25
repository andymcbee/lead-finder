import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const addContact = async (req, res) => {
  let { domain: rawDomain, fName: rawFName, lName: rawLName } = req.body;

  //global variables for never bounce API calls.
  // No spaces, no special characters, all low case

  let apiFriendlyDomain;
  let apiFriendlyFirstName;
  let apiFriendlyLastName;

  let foundEmail = false;

  //function: Make text email address friendly (Remove special characters, low case, spaces)

  const emailFriendlyText = (text) => {
    let formattedText = text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    return formattedText;
  };

  //FUNCTION: extract domain, make it low case
  const extractFriendlyDomain = (rawDomain) => {
    const url = rawDomain.toLowerCase();
    const { hostname } = new URL(url);

    if (hostname.includes("www")) {
      apiFriendlyDomain = hostname.replace("www.", "");
    } else {
      apiFriendlyDomain = hostname;
    }
  };

  extractFriendlyDomain(rawDomain);

  //Function: main email verification function

  const verifyEmail = async (email) => {
    let validValue = false;

    if (!foundEmail) {
      try {
        const { data } = await axios.post(
          `https://api.neverbounce.com/v4/single/check?key=${process.env.NEVERBOUNCE_API_KEY}&email=${email}`
        );

        validValue = data.result;

        res.status(201).json(data);
      } catch (error) {
        res.status(409).json(error);
      }
    }

    if (validValue) {
      foundEmail = true;
    }
  };

  //function to get fname + domain.... then trigger verify Email from inside
  //Make sure this is set to await so it triggers one after the next

  // MAKE FIRST NAME API FRIENDLY
  const transformFirstName = (fName) => {
    apiFriendlyFirstName = emailFriendlyText(fName);
  };

  transformFirstName(rawFName);

  // MAKE LAST NAME API FRIENDLY
  const transformLastName = (lName) => {
    apiFriendlyLastName = emailFriendlyText(lName);
  };

  transformLastName(rawLName);

  // function: F name + Domain... then call
  //be sure to pass API friendly data

  const checkVariantFName = async (firstName, domain) => {
    //construct email
    let email = `${firstName}@${domain}`;
    console.log(email);

    //call NBounce API
    await verifyEmail(email);
  };

  //call function for first name + domain variant

  // function: F name initial + last name + Domain... then call

  const checkVariantFNameInitialLastName = async (
    firstName,
    lastName,
    domain
  ) => {
    let fNameInitial = firstName.charAt(0);
    let email = `${fNameInitial}${lastName}@${domain}`;
    console.log(email);
    await verifyEmail(email);
  };

  // firstname + last name

  const checkVariantFNameLastName = async (firstName, lastName, domain) => {
    let email = `${firstName}${lastName}@${domain}`;
    console.log(email);
    await verifyEmail(email);
  };

  //first initia . last name
  const checkVariantFNameInitialDotLastName = (firstName, lastName, domain) => {
    const fNameInitial = firstName.charAt(0);
    let email = `${fNameInitial}.${lastName}@${domain}`;
    console.log(email);
    verifyEmail(email);
  };
  //first name . last name

  const checkVariantFNameDotLastName = (firstName, lastName, domain) => {
    let email = `${firstName}.${lastName}@${domain}`;
    console.log(email);
    verifyEmail(email);
  };

  // call all the checks with await
  await checkVariantFName(apiFriendlyFirstName, apiFriendlyDomain);

  await checkVariantFNameInitialLastName(
    apiFriendlyFirstName,
    apiFriendlyLastName,
    apiFriendlyDomain
  );
  /* 
  !foundEmail &&
    checkVariantFNameLastName(
      apiFriendlyFirstName,
      apiFriendlyLastName,
      apiFriendlyDomain
    );
  !foundEmail &&
    checkVariantFNameInitialDotLastName(
      apiFriendlyFirstName,
      apiFriendlyLastName,
      apiFriendlyDomain
    );
  !foundEmail &&
    checkVariantFNameDotLastName(
      apiFriendlyFirstName,
      apiFriendlyLastName,
      apiFriendlyDomain
    );  */

  /*   await verifyEmail(email2);
  !foundEmail &&
    console.log(
      "THIS SHOULD FIRE AFTER RESPONSE AND ONLY IF FOUND EMAIL IS FALSE"
    ); */
  //create an individual function for every single "type" that then also triggers the veryfiy email....
  //thenh I can simply do a chain of "if else" perhaps?
};
