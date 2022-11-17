/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";
import { RingsContextProvider } from "./context/RingsContext/RingsContextProvider";

render(
  () => (
    <RingsContextProvider rings={[]} activeRing="">
      <App />
    </RingsContextProvider>
  ),
  document.getElementById("root") as HTMLElement
);
