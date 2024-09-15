import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../services/auth/authSlice';
import productReducer from '../services/product/productSlice';
import orderReducer from '../services/order/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;