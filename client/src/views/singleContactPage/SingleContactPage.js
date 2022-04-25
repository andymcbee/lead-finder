import React from "react";
import { useParams } from "react-router-dom";

export const SingleContactPage = () => {
  const { contactId } = useParams();
  console.log(contactId);
  return <div>SingleContactPage</div>;
};
