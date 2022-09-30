import { API } from "../../config/api";
import { jsonHeaderConfig } from "../../config/configHeader";

const getALlBooks = async () => {
  const response = await API.get("/books", jsonHeaderConfig(null));
  return response.data.data;
};

const addBook = async (bookData, token) => {
  const response = await API.post("/book", bookData, jsonHeaderConfig(token));
  return response.data.data;
};

const bookService = {
  getALlBooks,
  addBook,
};

export default bookService;
