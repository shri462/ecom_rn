import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import authReducer from './auth/auth.reducer';
import productsReducer from './products/products.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productsReducer,
});

const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default reduxStore;

//exporting pre-defined type for redux selector
export type RootState = ReturnType<typeof reduxStore.getState>;

//exporting pre-defined type for redux dispatch
export type AppDispatch = typeof reduxStore.dispatch;
