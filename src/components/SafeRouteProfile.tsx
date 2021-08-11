import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import SingleUserPage from "../pages/SingleUserPage";

interface Props {
  path: string;
}

const SafeRouteLogged: React.FC<Props> = ({ path }) => {
  const { isLogged } = useGlobalContext()!;

  return isLogged ? (
    <Route path={path}>
      <SingleUserPage />
    </Route>
  ) : (
    <Redirect to="/" />
  );
};

export default SafeRouteLogged;
