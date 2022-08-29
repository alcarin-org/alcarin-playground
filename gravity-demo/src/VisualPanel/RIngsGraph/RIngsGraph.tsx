import { StyledRingsGraphWrapper } from "./RingsGraph.styled";

export const RingsGraph = () => {
  return (
    <StyledRingsGraphWrapper viewBox="0 0 300 300">
      <g>
        <circle
          r={50}
          stroke="#000"
          cy="50%"
          cx="50%"
          stroke-width={3}
          fill="none"
        />
      </g>
    </StyledRingsGraphWrapper>
  );
};
