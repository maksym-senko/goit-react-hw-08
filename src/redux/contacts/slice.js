import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  logout,
} from "./operations.js";


const initialState = {
  items: [],
  isLoading: false,
  error: null,
};


const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};


const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};


const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(logout.fulfilled, (state) => {
        state.items = [];
        state.isLoading = false;
        state.error = null;
      });
  },
});


export default contactsSlice.reducer;
