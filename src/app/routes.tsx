import { Route } from "@solidjs/router";
import { Component } from "solid-js";
import { FlowerGeneratorPage } from "../pages/flower-generator";

export const AppRoutes: Component = () => {
  return <Route path="/" component={FlowerGeneratorPage} />;
};
