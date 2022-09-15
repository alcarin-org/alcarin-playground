/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";
import { RingsContextProvider } from "./context/RingsContextProvider";

render(
  () => (
    <RingsContextProvider
      rings={[{ id: "123", active: true, radius: 20, mass: 300 }]}
      activeRing="123"
    >
      <App />
    </RingsContextProvider>
  ),
  document.getElementById("root") as HTMLElement
);
