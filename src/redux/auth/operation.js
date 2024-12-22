import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";


const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};


export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", data);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (e) {
      if (e.response?.data?.message === "Email in use") {
        toast.error("This email is already registered. Please login.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", data);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (e) {

      const errorMessage = e.response?.data?.message || "Error password";
      return thunkAPI.rejectWithValue(errorMessage); // передаємо повідомлення помилки
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    setAuthHeader(null);
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      setAuthHeader(token);
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);