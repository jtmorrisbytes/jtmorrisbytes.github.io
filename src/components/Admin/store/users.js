import client from "../customAxios";

const INITIAL_STATE = {
  data: [],
  loading: true,
  initialized: false,
  error: null,
};
const GET_USERS = "GET_USERS";

function getUsersPending() {
  return { type: GET_USERS, payload: { loading: true } };
}

function getUsers(users) {
  return { type: GET_USERS, payload: { loading: false, users } };
}

function getUsersAsync() {
  return (dispatch) => {
    dispatch(getUsersPending());
    return client.get("/admin/users").then((response) => {
      dispatch(getUsers(response.data));
    });
  };
}

export function initUsersAsync() {
  return (dispatch) => {
    return dispatch(getUsersAsync());
    // return Promise.resolve();
  };
}

const users = (state = INITIAL_STATE, a) => {
  const { type, payload } = a;
  switch (type) {
    case GET_USERS: {
      const { error, loading, users } = payload;
      return { ...state, error, loading, data: users };
    }
    default:
      return state;
  }
};
export default users;
