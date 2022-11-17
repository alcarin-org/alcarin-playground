import { StyledButton } from "../../components/StyledButton";
import {
  StyledInput,
  StyledInputWrapper,
  StyledLabel,
} from "../../components/StyledInput";

import { StyledGraphSettings } from "./GraphSettings.styled";

export const GraphSettings = () => {
  const handleSetBoardDimensions = () => {};

  return (
    <StyledGraphSettings>
      <StyledInputWrapper>
        <StyledLabel for="graphWidth">Radius</StyledLabel>
        <StyledInput
          type="number"
          id="graphWidth"
          onChange={(e) => onChangeGraphWidth(e, ring.id)}
          value={}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <StyledLabel for="graphHeight">Mass</StyledLabel>
        <StyledInput
          type="number"
          id="graphHeight"
          onChange={(e) => onChangeMass(e, ring.id)}
          value={}
        />
      </StyledInputWrapper>
      <StyledButton onClick={handleSetBoardDimensions}>
        Set board dimensions
      </StyledButton>
    </StyledGraphSettings>
  );
};
