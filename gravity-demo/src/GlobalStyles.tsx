import { createGlobalStyles } from "solid-styled-components";
import "@fontsource/kanit";
import "@fontsource/inter";

export const GlobalStyles = () => {
  const Styles = createGlobalStyles({
    "html, body": {
      margin: 0,
      padding: 0,
      fontFamily: "Kanit, sans-serif",
    },

    "*": {
      boxSizing: "border-box",
    },

    "button, input": {
      fontFamily: "Inter, sans-serif",
    },
  });

  return <Styles />;
};
