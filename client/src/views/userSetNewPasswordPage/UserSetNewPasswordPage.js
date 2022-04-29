import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { Link, useParams, useNavigate } from "react-router-dom";

const theme = createTheme();

export default function UserSignin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId, jwt } = useParams();

  console.log(userId);
  console.log(jwt);

  const { setNewPassword } = bindActionCreators(actionCreators, dispatch);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = { password, confirmPassword, userId, jwt };
    //be sure to pass the user ID of the current page through ... and also the JWT? Or just the JWT?
    setNewPassword(data, navigate);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Set New Password
          </Typography>
          <Box component="form" validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confrm Password"
                  name="confirmPassword"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Set New Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
