import { styled } from "solid-styled-components";
type StyledRingWrapperProps = {
  active: boolean;
};

export const StyledRingWrapper = styled("li")<StyledRingWrapperProps>(
  ({ active }) => ({
    padding: "16px",
    backgroundColor: active ? "#90C8AC" : "#fff",
    cursor: "pointer",
  })
);

export const StyledTitle = styled("p")({
  margin: "4px 0",
  fontSize: "16px",
});

export const StyledHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});
