import * as redux from "redux";
import thunk from "redux-thunk";
import client from "./customAxios";

import * as consts from "./constants";

// constants
const GITHUB_OAUTH_FLOW_START =
  "https://github.com/login/oauth/authorize?client_id=${client_id}&state=${state}";
const GITHUB_OAUTH_FLOW_VERIFY_CODE = "/admin/login/verify/access_code";
const GITHUB_OAUTH_FLOW_VERIFY_TOKEN =
  "https://github.com/login/oauth/access_token";

const AUTH_LOGIN_URL = "/admin/login";
const AUTH_VERIFY_TOKEN_URL = "/admin/login/verify/access_token";

// reducer constants
const APP_INIT = "APP_INIT";
const GET_USER = "GET_USER";
const AUTH_FLOW = "AUTH_FLOW";

const INITIAL_STATE = {
  loading: true,
  user: { loading: true, initialized: false, data: {}, error: null },
  auth: { loading: true, initialized: false, loginUrl: "/admin/login" },
  githubAuth: {
    oAuthFlowStartUrl: GITHUB_OAUTH_FLOW_START,
    requestedScopes: "",
    grantedScopes: "",
  },
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
function getUserError() {
  return { type: GET_USER, payload: { loading: false, error: true } };
}
function userUnauthorized() {
  return { type: GET_USER, payload: { loading: false, authorized: false } };
}
function userLoginRequried() {
  return {
    type: GET_USER,
    payload: {
      loading: false,
      error: {
        error: consts.LOGIN_REQUIRED_ERROR,
        error_description: consts.LOGIN_REQUIRED_DESCRIPTION,
      },
    },
  };
}

function authFlowStart(state) {
  return { type: AUTH_FLOW, payload: { state: state || "" } };
}

function startAuthFlowAsync() {
  return (dispatch) => {
    return client.get(AUTH_LOGIN_URL).then((response) => {
      dispatch(authFlowStart(response?.data?.state));
    });
  };
}

function appInit() {
  return { type: APP_INIT, payload: { loading: false } };
}
function appInitPending() {
  return { type: APP_INIT, payload: { loading: true } };
}
function appInitError(error) {
  return { type: APP_INIT, payload: { loading: false, error } };
}

function getUserAsync() {
  return (dispatch) => {
    dispatch(getUserPending());
    return client
      .get("/admin/user")
      .then((response) => {
        console.log("GetUserAsync resolved", response);
        dispatch(getUser(response.data));
        return Promise.resolve(response.data);
      })
      .catch((e) => {
        const { request, response } = e;
        console.log("getUserAsync rejected", response);
        console.dir(response);
        if (response.status === 401 || response.status === 403) {
          dispatch(userLoginRequried());
          dispatch(startAuthFlowAsync());
        } else {
          dispatch(getUserError());
        }
        // return Promise.reject(e);
      });
  };
}

export function appInitAsync() {
  return (dispatch, getState) => {
    console.log("Initializing application");
    dispatch(appInitPending());
    console.log("getting initial data");
    return Promise.all([dispatch(getUserAsync())])
      .then((results) => {
        dispatch(appInit());
      })
      .catch((e) => {
        dispatch(appInitError(e));
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
      const { loading, error } = payload;
      return { ...state, loading, error };
    }
    case AUTH_FLOW:
      return { ...state, auth: { ...state.auth, state: payload.state } };
    case GET_USER: {
      var { loading, error, user } = payload;
      console.log("GET USER", loading, error, user);
      return { ...state, user: { data: user || {}, loading, error } };
    }
    default:
      return state;
  }
}

const store = redux.createStore(reducer, redux.applyMiddleware(thunk));
export default store;
