import { For } from "solid-js";

import { StyledButton } from "../components/StyledButton";
import { RingSettings } from "./RingSettings/RingSettings";

import { getRings } from "./getRings";
import {
  StyledButtonPanel,
  StyledPanelWrapper,
  StyledRingsList,
} from "./SettingsPanel.styled";

export const SettingsPanel = () => {
  const {
    rings,
    handleAddRing,
    setActiveRing,
    handleChangeMass,
    handleChangeRadius,
    handleRemoveRing,
  } = getRings();

  return (
    <StyledPanelWrapper>
      <StyledButtonPanel>
        <StyledButton onClick={handleAddRing}>Add gravity ring</StyledButton>
      </StyledButtonPanel>
      <StyledRingsList>
        <For each={rings}>
          {(ring, index) => (
            <RingSettings
              ring={ring}
              index={index()}
              onHover={(_, ringId: string) => setActiveRing(ringId)}
              onChangeRadius={handleChangeRadius}
              onChangeMass={handleChangeMass}
              onRemoveRing={handleRemoveRing}
            />
          )}
        </For>
      </StyledRingsList>
    </StyledPanelWrapper>
  );
};
