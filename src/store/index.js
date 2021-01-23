import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { DESTROY_STATE } from "../action/constants";
import trackReducer from "../reducer/trackReducer";

const appReducer = combineReducers({
  track: trackReducer,
});

const rootReducer = (state, action) => {
  if (action.type === DESTROY_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
};

let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
