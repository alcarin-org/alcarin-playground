import { For } from "solid-js";

import { StyledButton } from "../components/StyledButton";
import { RingSettings } from "./RingSettings/RingSettings";

import { useRings } from "../context/RingsContext";

import {
  StyledButtonPanel,
  StyledPanelWrapper,
  StyledRingsList,
} from "./SettingsPanel.styled";

export const SettingsPanel = () => {
  const ringsContext = useRings();

  const {
    state: { rings },
    actions: { addRing, setActiveRing, changeRadius, changeMass, removeRing },
  } = ringsContext;

  return (
    <StyledPanelWrapper>
      <StyledButtonPanel>
        <StyledButton onClick={addRing}>Add gravity ring</StyledButton>
      </StyledButtonPanel>
      <StyledRingsList>
        <For each={rings}>
          {(ring, index) => (
            <RingSettings
              ring={ring}
              index={index()}
              onHover={(_, ringId: string) => setActiveRing(ringId)}
              onChangeRadius={changeRadius}
              onChangeMass={changeMass}
              onRemoveRing={removeRing}
            />
          )}
        </For>
      </StyledRingsList>
    </StyledPanelWrapper>
  );
};
