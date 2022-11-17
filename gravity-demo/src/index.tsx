/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";
import { RingsContextProvider } from "./context/RingsContextProvider";

render(
  () => (
    <RingsContextProvider rings={[]} activeRing="">
      <App />
    </RingsContextProvider>
  ),
  document.getElementById("root") as HTMLElement
);
