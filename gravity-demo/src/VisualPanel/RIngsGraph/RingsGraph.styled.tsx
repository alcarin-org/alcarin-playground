import { styled } from "solid-styled-components";

type StyledRingsGraphWrapperProps = {
  height: number;
  width: number;
};

export const StyledRingsGraphWrapper = styled(
  "div"
)<StyledRingsGraphWrapperProps>(({ height, width }) => ({
  width: `${width}px`,
  margin: "16px",
  height: `${height}px`,
}));

export const StyledRingsGraph = styled("svg")({
  border: "1px solid #000",
  width: "100%",
  height: "100%",
});
