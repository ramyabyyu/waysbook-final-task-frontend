import { API } from "../../config/api";
import { jsonHeaderConfig } from "../../config/configHeader";

const getALlBooks = async () => {
  const response = await API.get("/books", jsonHeaderConfig(null));
  return response.data.data;
};

const bookService = {
  getALlBooks,
};

export default bookService;
