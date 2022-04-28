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
