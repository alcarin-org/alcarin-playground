import type { Component } from "solid-js";
import { GlobalStyles } from "./GlobalStyles";

import { GravityDashboard } from "./GravityDashboard/GravityDashboard";

const App: Component = () => {
  return (
    <>
      <GlobalStyles />
      <GravityDashboard />
    </>
  );
};

export default App;
