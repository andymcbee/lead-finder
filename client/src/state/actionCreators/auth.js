import * as api from "../../api";

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    console.log("DATA FROM BACKEND:::::");
    console.log(data);
    const { token } = data;
    console.log(token);

    dispatch({ type: "AUTH", data: data.result });

    localStorage.setItem("jwt", JSON.stringify({ token: token }));
    navigate("/");
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    console.log("SIGN IN USER ACTION CREATOR DATA:::");

    console.log(data);

    const { token } = data;

    await dispatch({ type: "AUTH", data: data.result });

    localStorage.setItem("jwt", JSON.stringify({ token: token }));

    navigate("/");
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await api.getUser();
    console.log("GET USER ACTION CREATOR DATA:::");

    console.log(data);

    await dispatch({ type: "AUTH", data });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    console.log("LOGOUT:::: START");
    localStorage.clear();

    await dispatch({ type: "LOGOUT" });
    navigate("/login");
    console.log("LOGOUT:::: END");
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
