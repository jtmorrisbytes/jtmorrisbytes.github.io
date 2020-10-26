import React, { useEffect, useState } from "react";
import client from "./customAxios";
import Axios from "axios";
import { Route } from "react-router-dom";
import Routes from "./routes";
import UserContext, { connectUser } from "./User/context";

const { REACT_APP_CLIENT_ID } = process.env;

function AdminApp(props) {
  return (
    <>
      <UserContext>
        <Routes match={props.match} history={props.history} />
      </UserContext>
    </>
  );
}
export default AdminApp;
