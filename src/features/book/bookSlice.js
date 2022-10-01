import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serviceErrorMessage } from "../../helpers/serviceErrorMessage";
import bookService from "./bookService";

const initialState = {
  books: [],
  promoBooks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllBooks = createAsyncThunk(
  "book/getAll",
  async (_, thunkAPI) => {
    try {
      return await bookService.getAllBooks();
    } catch (error) {
      serviceErrorMessage(error, thunkAPI);
    }
  }
);

export const addBook = createAsyncThunk(
  "book/add",
  async (bookData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await bookService.addBook(bookData, token);
    } catch (error) {
      serviceErrorMessage(error, thunkAPI);
    }
  }
);

export const getPromoBooks = createAsyncThunk(
  "book/getPromo",
  async (_, thunkAPI) => {
    try {
      return await bookService.getPromoBooks();
    } catch (error) {
      serviceErrorMessage(error, thunkAPI);
    }
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // get all books
      .addCase(getAllBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPromoBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPromoBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.promoBooks = action.payload;
      })
      .addCase(getPromoBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookSlice.actions;
export default bookSlice.reducer;
