/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";
import { GraphContextProvider } from "./context/GraphContext/GraphContextProvider";
import { RingsContextProvider } from "./context/RingsContext/RingsContextProvider";

render(
  () => (
    <GraphContextProvider graphHeight={500} graphWidth={500}>
      <RingsContextProvider rings={[]} activeRing="">
        <App />
      </RingsContextProvider>
    </GraphContextProvider>
  ),
  document.getElementById("root") as HTMLElement
);
