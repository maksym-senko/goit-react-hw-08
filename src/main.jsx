import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import App from "./App.jsx";
import "./index.css";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2000,
          }}
        />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);