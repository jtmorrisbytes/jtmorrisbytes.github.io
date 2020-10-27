const INITIAL_STATE = {
  data: [],
  loading: true,
  initialized: false,
  error: null,
};

const users = (s = INITIAL_STATE, a) => {
  const { type, payload } = a;
  switch (type) {
    default:
      return s;
  }
};
export default users;
