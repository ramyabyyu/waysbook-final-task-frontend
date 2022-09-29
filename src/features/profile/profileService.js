import { API } from "../../config/api";
import { jsonHeaderConfig } from "../../config/configHeader";

const getProfile = async (token) => {
  const response = await API.get("/user", jsonHeaderConfig(token));
  return response.data.data;
};

const changeUserRole = async (token) => {
  const response = await API.post("/become-seller", jsonHeaderConfig(token));

  if (response.status === 200) {
    // remove the old token
    localStorage.removeItem("token");

    // change it to new token from API response
    const newToken = response.data.data.token;
    localStorage.setItem("token", newToken);
    return newToken;
  }

  return response.data;
};

const profileService = {
  getProfile,
  changeUserRole,
};

export default profileService;
