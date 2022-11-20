import {
  StyledInput,
  StyledInputWrapper,
  StyledLabel,
} from "../../components/StyledInput";
import { useGraphContext } from "../../context/GraphContext/useGraphContext";

import {
  StyledGraphSettings,
  StyledInputsWrapper,
} from "./GraphSettings.styled";

export const GraphSettings = () => {
  const graphContext = useGraphContext();

  const {
    state,
    actions: { setGraphHeight, setGraphWidth },
  } = graphContext;

  return (
    <StyledGraphSettings>
      <p>Board dimensions:</p>
      <StyledInputsWrapper>
        <StyledInputWrapper>
          <StyledLabel for="graphWidth">Width</StyledLabel>
          <StyledInput
            type="number"
            id="graphWidth"
            onChange={setGraphWidth}
            value={state.width}
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledLabel for="graphHeight">Height</StyledLabel>
          <StyledInput
            type="number"
            id="graphHeight"
            onChange={setGraphHeight}
            value={state.height}
          />
        </StyledInputWrapper>
      </StyledInputsWrapper>
    </StyledGraphSettings>
  );
};
