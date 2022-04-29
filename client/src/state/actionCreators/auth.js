import * as api from "../../api";

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);

    dispatch({ type: "AUTH", data });
    navigate("/");
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    //  alert("Hello");
    // console.log(data.response.response.data);

    dispatch({ type: "AUTH", data });
    navigate("/");
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = (formData) => async (dispatch) => {
  try {
    const resetAPICall = await api.resetPassword(formData);
    console.log(resetAPICall);

    await dispatch({ type: "RESETPASSWORD" });

    //show success message
    await dispatch({
      type: "NOTIFICATION",
      showMessage: true,
      text: "Success!",
      subtext: "Check your email for your reset link.",
      notifType: "success",
    });

    //hide success message after

    await setTimeout(() => {
      dispatch({
        type: "NOTIFICATION",
        showMessage: false,
        text: null,
        subtext: null,

        notifType: null,
      });
    }, "2000");
  } catch (error) {
    console.log(error);
  }
};

export const setNewPassword = (data, navigate) => async (dispatch) => {
  try {
    const user = await api.setNewPassword(data);

    await console.log("Should fire after set password API call");

    await dispatch({ type: "SETNEWPASSWORD" });

    await console.log(
      "Should fire immediately after set password is complete..."
    );
    //show success message
    await dispatch({
      type: "NOTIFICATION",
      showMessage: true,
      text: "Password reset!",
      subtext: "Your password has been updated.",
      notifType: "success",
    });

    //hide success message after

    navigate("/login");

    await setTimeout(() => {
      dispatch({
        type: "NOTIFICATION",
        showMessage: false,
        text: null,
        subtext: null,

        notifType: null,
      });
    }, "2000");

    //   alert("Check your email for a password reset link");
  } catch (error) {
    console.log(error);
  }
};
