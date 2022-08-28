import { For } from "solid-js";
import { RingSettings } from "../RingSettings/RingSettings";
import { getRings } from "./getRings";

import { StyledPanelWrapper, StyledRingsList } from "./SettingsPanel.styled";

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
      <button onClick={handleAddRing}>Add gravity ring</button>
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
