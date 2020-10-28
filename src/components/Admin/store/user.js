import * as consts from "../constants";
const { default: client } = require("../customAxios");

const GET_DB_USER = "GET_DB_USER";
const GET_DB_USER_FAILED = "GET_DB_USER_FAILED";

const initialState = {
  data: null,
  error: null,
  loading: true,
};

function getDbUserPending() {
  return {
    type: GET_DB_USER,
    payload: { loading: true, data: {}, error: null },
  };
}
function getDbUserSuccess(user) {
  return {
    type: GET_DB_USER,
    payload: { loading: false, data: user, error: null },
  };
}
function getDbUserGeneralFailure(reason) {
  return {
    type: GET_DB_USER_FAILED,
    payload: {
      loading: false,
      data: null,
      error: consts.ERROR_GENERAL_FAILURE,
      reason,
    },
  };
}

function DbUserNotFound() {
  return {
    type: GET_DB_USER,
    payload: { loading: false, data: null, error: consts.ERROR_USER_NOT_FOUND },
  };
}

export function getDbUserAsync(username) {
  return (dispatch) => {
    dispatch(getDbUserPending());
    return client
      .get(`/admin/user/${username}`)
      .then((response) => {
        if (
          !Array.isArray(response.data) &&
          typeof response.data === "object"
        ) {
          dispatch(getDbUserSuccess(response.data));
        } else {
          dispatch(
            getDbUserGeneralFailure(
              `getDbUserAsync recieved '${typeof response.data}' but was expecting 'object'`
            )
          );
        }
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          dispatch(DbUserNotFound());
        } else {
          dispatch(getDbUserGeneralFailure());
        }
      });
  };
}

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DB_USER: {
      const { data, error, loading } = payload;
      return { data, error, loading };
    }
    case GET_DB_USER_FAILED: {
      const { data, error, loading, reason } = payload;
      return { data, error, loading, reason };
    }
    default:
      return state;
  }
}
export default userReducer;
