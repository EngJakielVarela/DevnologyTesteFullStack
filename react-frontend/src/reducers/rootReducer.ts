import { cartActionType, cartInitialState, cartReducer } from "./cartReducer";
import combineReducers from "./combineReducers";
import {
  layoutActionType,
  layoutInitialState,
  layoutReducer,
} from "./layoutReducer";
import {
  productsActionType,
  productsInitialState,
  productReducer,
} from "./productReducer";

export type rootActionType =
  | layoutActionType
  | cartActionType
  | productsActionType;

export const initialState = {
  layout: layoutInitialState,
  cart: cartInitialState,
  products: productsInitialState,
};

export const rootReducer = combineReducers({
  layout: layoutReducer,
  cart: cartReducer,
  products: productReducer,
});
