import { styled } from "solid-styled-components";

export const StyledInput = styled("input")({
  border: 0,
  borderBottom: "1px solid #ccc",
  backgroundColor: "transparent",

  "&:focus": {
    outline: "none",
    borderColor: "#24292E",
  },
});
