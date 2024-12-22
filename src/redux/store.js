// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filters/slice"; // Імпортуємо редуктор фільтрів
import contactsReducer from "./contacts/slice"; // Ваш редуктор контактів
import { persistedAuthReducer } from "./auth/slice";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    contacts: contactsReducer,
    filters: filtersReducer, // Додаємо редуктор фільтрів
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
