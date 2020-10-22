import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {DESTROY_STATE} from "../action/constants";

const appReducer = combineReducers({});

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
