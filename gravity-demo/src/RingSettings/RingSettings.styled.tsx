import { styled } from "solid-styled-components";

export const StyledRingWrapper = styled("li")({
  margin: "16px",
});

type StyledLabelProps = {
  active: boolean;
};

export const StyledLabel = styled("label")({
  marginRight: "16px",
});

export const StyledTitle = styled("p")<StyledLabelProps>(({ active }) => ({
  fontWeight: active ? "bold" : "normal",
}));
