import { styled } from "solid-styled-components";
import { RingsGraph } from "./RIngsGraph/RIngsGraph";

export const VisualPanel = () => {
  return (
    <StyledVisualPanelWrapper>
      <RingsGraph />
    </StyledVisualPanelWrapper>
  );
};

const StyledVisualPanelWrapper = styled("div")({
  flex: 1,
});
