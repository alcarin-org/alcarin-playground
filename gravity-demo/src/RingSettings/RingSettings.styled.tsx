import { styled } from "solid-styled-components";
type StyledRingWrapperProps = {
  active: boolean;
};

export const StyledRingWrapper = styled("li")<StyledRingWrapperProps>(
  ({ active }) => ({
    padding: "16px",
    backgroundColor: active ? "#f5f5f5" : "#fff",
  })
);

export const StyledLabel = styled("label")({
  marginRight: "16px",
  fontWeight: 400,
});

export const StyledTitle = styled("p")({
  margin: "4px 0",
  fontSize: "16px",
});

export const StyledInputWrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "30% 1fr",
});

export const StyledHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});
