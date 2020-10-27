import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import client from "../customAxios";

import DBReducer from "./db";
import users from "./users";
import github from "./github";

import * as consts from "../constants";

import { getGithubUserAsync } from "./github";

// constants

// reducer constants
const APP_INIT = "APP_INIT";

const INITIAL_STATE = {
  loading: true,
  auth: { loading: true, initialized: false, loginUrl: "/admin/login" },
};

function appInit() {
  return { type: APP_INIT, payload: { loading: false } };
}
function appInitPending() {
  return { type: APP_INIT, payload: { loading: true } };
}
function appInitError(error) {
  return { type: APP_INIT, payload: { loading: false, error } };
}

export function appInitAsync() {
  return (dispatch, getState) => {
    console.log("Initializing application");
    dispatch(appInitPending());
    console.log("getting initial data");
    return Promise.all([dispatch(getGithubUserAsync())])
      .then((results) => {
        dispatch(appInit());
      })
      .catch((e) => {
        dispatch(appInitError(e));
      });
  };
}

function reducer(state = INITIAL_STATE, action) {
  console.log("ADMIN_REDUCER", state, action);
  const { type, payload } = action;
  // block statements have been placed
  // around the executing body
  // because of block-scoped 'let' and 'const' inside switch statements
  switch (type) {
    case APP_INIT: {
      const { loading, error } = payload;
      return { ...state, loading, error };
    }
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({ app: reducer, users, github, db: DBReducer }),
  applyMiddleware(thunk)
);
export default store;
