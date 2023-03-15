"use client";
import { configureStore } from "@reduxjs/toolkit";
import quotationReducer from "./Features/Quotation/quotationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "main-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, quotationReducer);

export const store = configureStore({
  reducer: {
    quotation: persistedReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
