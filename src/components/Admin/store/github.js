import * as consts from "../constants";
import client from "../customAxios";

const GET_GITHUB_USER = "GET_GITHUB_USER";
const AUTH_FLOW = "AUTH_FLOW";

const GITHUB_OAUTH_FLOW_START =
  "https://github.com/login/oauth/authorize?client_id=${client_id}&state=${state}";
const GITHUB_OAUTH_FLOW_VERIFY_CODE = "/admin/login/verify/access_code";
const GITHUB_OAUTH_FLOW_VERIFY_TOKEN =
  "https://github.com/login/oauth/access_token";

const AUTH_LOGIN_URL = "/admin/login";
const AUTH_VERIFY_TOKEN_URL = "/admin/login/verify/access_token";

const INITIAL_STATE = {
  data: [],
  loading: true,
  initialized: false,
  error: null,
  oAuthFlowStartUrl: GITHUB_OAUTH_FLOW_START,
  requestedScopes: "",
  grantedScopes: "",
};

function getGithubUser(user) {
  return {
    type: GET_GITHUB_USER,
    payload: { loading: false, user },
  };
}

function userUnauthorized() {
  return {
    type: GET_GITHUB_USER,
    payload: { loading: false, authorized: false },
  };
}
function userLoginRequried() {
  return {
    type: GET_GITHUB_USER,
    payload: {
      loading: false,
      error: {
        error: consts.LOGIN_REQUIRED_ERROR,
        error_description: consts.LOGIN_REQUIRED_DESCRIPTION,
      },
    },
  };
}

function getGithubUserPending() {
  return { type: GET_GITHUB_USER, payload: { loading: true } };
}
function getGithubUserError() {
  return { type: GET_GITHUB_USER, payload: { loading: false, error: true } };
}
export function getGithubUserAsync() {
  return (dispatch) => {
    dispatch(getGithubUserPending());
    return client
      .get("/admin/user/github")
      .then((response) => {
        console.log("GetUserAsync resolved", response);
        dispatch(getGithubUser(response.data));
        return Promise.resolve(response.data);
      })
      .catch((e) => {
        const { request, response } = e;
        console.log("getGithubUserAsync rejected", response);
        console.dir(response);
        if (response.status === 401 || response.status === 403) {
          dispatch(userLoginRequried());
        } else {
          dispatch(getGithubUserError());
        }
        // return Promise.reject(e);
      });
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

function github(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_GITHUB_USER: {
      var { loading, error, user } = payload;
      console.log("GET USER", loading, error, user);
      return { ...state, user: { data: user || {}, loading, error } };
    }
    case AUTH_FLOW:
      return { ...state, auth: { ...state.auth, state: payload.state } };
    default:
      return state;
  }
}
export default github;
