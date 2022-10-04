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

export const getUserBooks = createAsyncThunk(
  "book/getUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await bookService.getUserBooks(token);
    } catch (error) {
      serviceErrorMessage(error, thunkAPI);
    }
  }
);

export const getBookBySlug = createAsyncThunk(
  "book/getBySlug",
  async (slug, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await bookService.getBookBySlug(slug, token);
    } catch (error) {
      serviceErrorMessage(error, thunkAPI);
    }
  }
);

export const updateBookPromo = createAsyncThunk(
  "book/updatePromo",
  async (promoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await bookService.updateBookPromo(promoData, token);
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
      })
      .addCase(getUserBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getUserBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBookBySlug.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getBookBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBookPromo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBookPromo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.promoBooks.push(action.payload);
      })
      .addCase(updateBookPromo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookSlice.actions;
export default bookSlice.reducer;
