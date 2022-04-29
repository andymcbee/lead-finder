import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import "./styles.css";

//Current supports Alert severity: error, warning, info, success.
// Pass severity type through notifType.

export const UiNotifications = (props) => {
  console.log(props);

  return (
    <div className="alertsWrapper">
      <Alert severity={props.data.notifType}>
        <AlertTitle>{props.data?.text}</AlertTitle>
        {props.data?.subtext}
      </Alert>
    </div>
  );
};
