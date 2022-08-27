import { styled } from "solid-styled-components";

export const StyledRingWrapper = styled("li")({
  margin: "16px",
});

type StyledLabelProps = {
  active: boolean;
};

export const StyledLabel = styled("label")<StyledLabelProps>(({ active }) => ({
  marginRight: "16px",
  fontWeight: active ? "bold" : "normal",
}));
