import { styled } from "solid-styled-components";

export const StyledButton = styled("button")({
  appearance: "none",
  padding: "4px 16px",
  backgroundColor: "#FAFBFC",
  border: "1px solid rgba(27, 31, 35, 0.15)",
  borderRadius: "6px",
  boxShadow:
    "rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset",
  color: "#24292E",
  cursor: "pointer",
  display: "inline-block",
  fontSize: "14px",
  lineHeight: "20px",
  transition: "background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1)",
  whiteSpace: "nowrap",
  wordWrap: "break-word",

  "&:hover": {
    backgroundColor: "#F3F4F6",
    transitionDuration: "0.1s",
  },

  "&:active": {
    backgroundColor: "#EDEFF2",
    boxShadow: "rgba(225, 228, 232, 0.2) 0 1px 0 inset",
  },
});
