import { API } from "../../config/api";
import {
  jsonHeaderConfig,
  formDataHeaderConfig,
} from "../../config/configHeader";

export const addToCart = async (cartData, token) => {
  const response = await API.post(
    "/cart",
    cartData,
    formDataHeaderConfig(token)
  );
  return response.data.data;
};

export const findMyCarts = async (token) => {
  const response = await API.get("/carts", jsonHeaderConfig(token));
  return response.data.data;
};

export const deleteCart = async (cartData) => {
  const response = await API.delete("/cart", cartData, jsonHeaderConfig(null));
  return response.data.data;
};

const cartService = {
  addToCart,
  findMyCarts,
  deleteCart,
};

export default cartService;
