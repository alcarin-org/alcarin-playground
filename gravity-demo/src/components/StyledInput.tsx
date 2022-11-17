import { styled } from "solid-styled-components";

export const StyledInputWrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "30% 1fr",
});

export const StyledInput = styled("input")({
  border: 0,
  borderBottom: "1px solid #ccc",
  backgroundColor: "transparent",

  "&:focus": {
    outline: "none",
    borderColor: "#24292E",
  },
});

export const StyledLabel = styled("label")({
  marginRight: "16px",
  fontWeight: 400,
});
