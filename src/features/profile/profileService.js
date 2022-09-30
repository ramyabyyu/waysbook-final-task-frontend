import { API } from "../../config/api";
import { jsonHeaderConfig } from "../../config/configHeader";

const getProfile = async (token) => {
  const response = await API.get("/user", jsonHeaderConfig(token));
  return response.data.data;
};

const profileService = {
  getProfile,
};

export default profileService;
