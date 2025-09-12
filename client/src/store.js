import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { productsReducer, productDetailsReducer } from "./reducers/productReducer";

// Combine all reducers into a single root reducer
const reducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
});

// Define the initial state. Reducers will handle their own initial state.
let initialState = {};

// Define the middleware to be used by Redux
const middleware = [thunk];

// Create the Redux store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
