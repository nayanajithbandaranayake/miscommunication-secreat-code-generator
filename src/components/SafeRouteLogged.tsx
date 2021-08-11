import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

interface Props {
  path: string;
  children: React.ReactNode;
}

const SafeRouteLogged: React.FC<Props> = ({ path, children }) => {
  const { isLogged } = useGlobalContext()!;

  return isLogged ? <Route path={path}>{children}</Route> : <Redirect to="/" />;
};

export default SafeRouteLogged;
