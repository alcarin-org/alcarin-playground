/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";
import { RingsContextProvider } from "./context/RingsContext";

render(
  () => (
    <RingsContextProvider>
      <App />
    </RingsContextProvider>
  ),
  document.getElementById("root") as HTMLElement
);
