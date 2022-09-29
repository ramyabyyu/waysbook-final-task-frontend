import { API } from "../../config/api";

const auth = async (userData, isRegister) => {
  let response;
  if (isRegister) {
    response = await API.post("/register", userData);
  } else {
    response = await API.post("/login", userData);
  }

  if (response.status === 200) {
    const token = response.data.data.token;
    localStorage.setItem("token", token);
    return token;
  } else if (response.status === 400) {
    console.log("bad request=", response.data.message);
    return response.data.message;
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  auth,
  logout,
};

export default authService;
