import * as redux from "redux";
import thunk from "redux-thunk";
import { func } from "prop-types";
import client from "./customAxios";

const APP_INIT = "APP_INIT";
const GET_USER = "GET_USER";

const INITIAL_STATE = {
  loading: true,
  user: { loading: true, initialized: false, data: {}, error: null },
};

function getUser(user) {
  return {
    type: GET_USER,
    payload: { loading: false, user },
  };
}
function getUserPending() {
  return { type: GET_USER, payload: { loading: true } };
}

function appInit() {
  return { type: APP_INIT, payload: { loading: false } };
}
function appInitPending() {
  return { type: APP_INIT, payload: { loading: true } };
}
function appInitError() {
  return { type: APP_INIT, payload: { loading: false, error: {} } };
}

function getUserAsync() {
  return (dispatch) => {
    dispatch(getUserPending());
    return client
      .get("/admin/user")
      .then((response) => {
        console.log("GetUserAsync resolved", response);
        dispatch(getUser(response.data));
      })
      .catch((error) => {
        console.log("getUserAsync rejected", error);
        if (error.status) {
        }
      });
  };
}

export function appInitAsync() {
  return (dispatch) => {
    console.log("Initializing application");
    dispatch(appInitPending());
    Promise.all([dispatch(getUserAsync())]).then((results) => {
      dispatch(appInit());
    });
  };
}

function reducer(state = INITIAL_STATE, action) {
  console.log("ADMIN_REDUCER", action);
  const { type, payload } = action;
  // block statements have been placed
  // around the executing body
  // because of block-scoped 'let' and 'const' inside switch statements
  switch (type) {
    case APP_INIT: {
      const { loading } = payload;
      return { ...state, loading };
    }

    case GET_USER: {
      var { loading, error, user } = payload;
      return { ...state, user: { data: user || {}, loading, error } };
    }
    default:
      return state;
  }
}

const store = redux.createStore(reducer, redux.applyMiddleware(thunk));
export default store;
