import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // Lưu trữ trong localStorage
import { combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import appSlice from './appSlice';
import productSlice from './products/productSlice';
import userSlice from './users/userSlice';

// Cấu hình persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["users"]  // Chỉ lưu 'users'
};

const rootReducer = combineReducers({
    app: appSlice,
    products: productSlice,
    users: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cấu hình store với persist
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);
export default store;
