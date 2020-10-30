import * as consts from "../constants";
import client from "../customAxios";
import { batch } from "react-redux";

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
  state: "",
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
      error: consts.LOGIN_REQUIRED_ERROR,
    },
  };
}

function getGithubUserPending() {
  return { type: GET_GITHUB_USER, payload: { loading: true } };
}
function getGithubUserError() {
  return { type: GET_GITHUB_USER, payload: { loading: false, error: true } };
}
export function getGithubUserAsync(token) {
  return (dispatch, getState) => {
    dispatch(getGithubUserPending());
    return client
      .get("/admin/user/github", {
        headers: {
          Authorization: `Bearer ${getState().github.token || token}`,
        },
      })
      .then((response) => {
        dispatch(
          getGithubUser({
            ...response.data,
            access_token: response.data.access_token || token,
          })
        );
        return Promise.resolve(response.data);
      })
      .catch((e) => {
        const { request, response } = e;
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
  return { type: AUTH_FLOW, payload: { state, loading: false } };
}
export function startAuthFlowAsync() {
  return (dispatch) => {
    return client.get(AUTH_LOGIN_URL).then((response) => {
      console.log("StartAuthFlowAsync responded with", response.data);
      dispatch(authFlowStart(response?.data?.state));
      return Promise.resolve(response.data);
    });
  };
}

function github(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_GITHUB_USER: {
      var { loading, error, user } = payload;
      console.log("GET USER", loading, error, user);
      return { ...state, data: user || {}, loading, error };
    }
    case AUTH_FLOW:
      console.log("AUTH_FLOW: reducer setting payload state:", payload.state);
      return { ...state, state: payload.state };
    default:
      return state;
  }
}
export default github;
