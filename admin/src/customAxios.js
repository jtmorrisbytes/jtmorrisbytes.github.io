import Axios from "axios";
const { REACT_APP_ADMIN_CLIENT_ID } = process.env;
const client = Axios.create({
  headers: { "X-ACID": REACT_APP_ADMIN_CLIENT_ID },
});
export default client;
