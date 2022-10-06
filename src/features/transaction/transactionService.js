import { API } from "../../config/api";
import { formDataHeaderConfig } from "../../config/configHeader";

const createTransaction = async (token) => {
  const reponse = await API.post("/transaction", formDataHeaderConfig(token));
  return Response.data.data;
};

const transactionService = {
  createTransaction,
};

export default transactionService;
