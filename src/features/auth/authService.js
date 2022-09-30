import { API } from "../../config/api";
import { jsonHeaderConfig } from "../../config/configHeader";

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
    return response.data.message;
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const becomeSeller = async (userData) => {
  const response = await API.post(
    "/become-seller",
    userData,
    jsonHeaderConfig(null)
  );

  if (response.status === 200) {
    // replace the old token with the new token
    const newToken = response.data.data.token;
    localStorage.setItem("token", newToken);

    return newToken;
  }

  return response.data;
};

const authService = {
  auth,
  logout,
  becomeSeller,
};

export default authService;
