import { API } from "../../config/api";
import {
  formDataHeaderConfig,
  jsonHeaderConfig,
} from "../../config/configHeader";

// Get all book to serve in home page list book section
const getAllBooks = async () => {
  const response = await API.get("/books", jsonHeaderConfig(null));
  return response.data.data;
};

// Add new book
const addBook = async (bookData, token) => {
  const response = await API.post("/book", bookData, jsonHeaderConfig(token));
  return response.data.data;
};

// Get books by promo to serve in home page book promo section
const getPromoBooks = async () => {
  const response = await API.get("/get-books-promo", jsonHeaderConfig(null));
  return response.data.data;
};

// Get user's book to serve in profile page
const getUserBooks = async (token) => {
  const response = await API.get("/get-user-book", jsonHeaderConfig(token));
  return response.data.data;
};

// get book by slug
const getBookBySlug = async (slug, token) => {
  const response = await API.get("/book/" + slug, jsonHeaderConfig(token));
  return response.data.data;
};

const updateBookPromo = async (promoData, token) => {
  const response = await API.post(
    "/update-book-promo",
    promoData,
    jsonHeaderConfig(token)
  );
  return response.data.data;
};

const bookService = {
  getAllBooks,
  addBook,
  getPromoBooks,
  getUserBooks,
  getBookBySlug,
  updateBookPromo,
};

export default bookService;
