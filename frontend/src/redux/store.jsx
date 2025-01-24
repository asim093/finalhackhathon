import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./Rootreducer";
import { persistReducer, persistStore } from 'redux-persist';  
import storage from 'redux-persist/lib/storage';  

const persistConfig = {
  key: "root",
  storage: storage,  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
