import { styled } from "solid-styled-components";

export const StyledPanelWrapper = styled("div")({
  borderRight: "1px solid #ccc",
  width: "40%",
  minHeight: 0,
  overflow: "auto",
});

export const StyledRingsList = styled("ul")({
  listStyleType: "none",
  padding: 0,
  margin: 0,
});

export const StyledButtonPanel = styled("div")({
  display: "grid",
  placeContent: "end",
  position: "sticky",
  top: 0,
  background: "#fff",
  borderBottom: "1px solid #ccc",
  padding: "16px",
});
