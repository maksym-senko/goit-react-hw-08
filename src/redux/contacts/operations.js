import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";


const BASE_URL = "https://connections-api.goit.global";


const apiRequest = async (endpoint, method = "GET", data = null, token = null) => {
  const config = {
    url: `${BASE_URL}${endpoint}`,
    method,
    data,
  };

 
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};


const handleError = (error) => error.response?.data?.message || error.message;


export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkAPI.rejectWithValue("User not authenticated");
  }

  try {
    return await apiRequest("/contacts", "GET", null, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const addContact = createAsyncThunk(
  "contacts/add",
  async (contactObj, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("User not authenticated");
    }

    try {
      if (!contactObj.name || !contactObj.number) {
        throw new Error("Both name and number are required.");
      }
      const newContact = await apiRequest("/contacts", "POST", contactObj, token);
      toast.success("Contact added successfully!");
      return newContact;
    } catch (error) {
      toast.error("Failed to add contact.");
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);


export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("User not authenticated");
    }

    try {
      await apiRequest(`/contacts/${id}`, "DELETE", null, token);
      toast.success("Contact deleted successfully!");
      return id;
    } catch (error) {
      toast.error("Failed to delete contact.");
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);


export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkAPI.rejectWithValue("User not authenticated");
  }

  try {
    await apiRequest("/logout", "POST", null, token);
    toast.success("Logged out successfully!");
    return;
  } catch (error) {
    toast.error("Logout failed.");
    return thunkAPI.rejectWithValue(handleError(error));
  }
});
