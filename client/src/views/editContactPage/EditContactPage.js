import React from "react";
import { useParams } from "react-router-dom";

export const EditContactPage = () => {
  const { contactId } = useParams();
  console.log(contactId);
  return <div>EditContactPage</div>;
};
