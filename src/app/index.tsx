import { Router } from "@solidjs/router";
import { Component } from "solid-js";
import { AppRoutes } from "./routes";

export const App: Component = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};
