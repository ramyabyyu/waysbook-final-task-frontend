import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serviceErrorMessage } from "../../helpers/serviceErrorMessage";
import bookService from "./bookService";

const initialState = {
  books: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllBooks = createAsyncThunk(
  "book/getAll",
  async (_, thunkAPI) => {
    try {
      return await bookService.getALlBooks();
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
        state.books.push(action.payload);
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
