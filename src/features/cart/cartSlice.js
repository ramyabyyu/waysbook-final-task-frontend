import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
import { serviceErrorMessage } from "../../helpers/serviceErrorMessage";
import cartService from "./cartService";

const initialState = {
  carts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addToCart = createAsyncThunk(
  "cart/add",
  async (cartData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await cartService.addToCart(cartData, token);
    } catch (error) {
      serviceErrorMessage(error, thunkAPI);
    }
  }
);

export const findMyCarts = createAsyncThunk(
  "cart/FindMine",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await cartService.findMyCarts(token);
    } catch (error) {
      serviceErrorMessage(error, thunkAPI);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteOne",
  async (cartData, thunkAPI) => {
    try {
      return await cartService.deleteCart(cartData);
    } catch (error) {
      serviceErrorMessage(error, thunkAPI);
    }
  }
);

export const cartSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.carts.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(findMyCarts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findMyCarts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.carts = action.payload;
      })
      .addCase(findMyCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.carts = state.carts.filter(
          (cart) => cart.id !== action.payload.id
        );
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
