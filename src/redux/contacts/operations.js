import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// Встановлення базової URL для запитів
axios.defaults.baseURL = "https://connections-api.goit.global";

// Функція для обробки API запитів
const apiRequest = async (url, method = "GET", data = null) => {
  try {
    const response = await axios({ url, method, data });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Обробка помилок
const handleError = (error) => error.response?.data?.message || error.message;

// Операції

// Отримання списку контактів
export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    return await apiRequest("/contacts");
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addContact = createAsyncThunk(
  "contacts/add",
  async (contactObj, thunkAPI) => {
    try {
      if (!contactObj.name || !contactObj.number) {
        throw new Error("Both name and number are required.");
      }
      const newContact = await apiRequest("/contacts", "POST", contactObj);
      toast.success("Contact added successfully!");  // Повідомлення про успіх
      return newContact;
    } catch (error) {
      toast.error("Failed to add contact.");  // Повідомлення про помилку
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Видалення контакту
export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (id, thunkAPI) => {
    try {
      await apiRequest(`/contacts/${id}`, "DELETE");
      toast.success("Contact deleted successfully!");  // Повідомлення про успіх
      return id; // Повертаємо id для видалення контактів зі списку
    } catch (error) {
      toast.error("Failed to delete contact.");  // Повідомлення про помилку
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await apiRequest("/logout", "POST");
    axios.defaults.headers.common.Authorization = "";
    toast.success("Logged out successfully!");  // Повідомлення про успіх
    return;
  } catch (error) {
    toast.error("Logout failed.");  // Повідомлення про помилку
    return thunkAPI.rejectWithValue(
      handleError(error) || "Logout failed."
    );
  }
});
