import { createEffect, For } from "solid-js";

import { StyledButton } from "../components/StyledButton";
import { useRingsContext } from "../context/RingsContext/useRingsContext";
import { GraphSettings } from "./GraphSettings/GraphSettings";

import { RingSettings } from "./RingSettings/RingSettings";
import {
  StyledButtonPanel,
  StyledPanelWrapper,
  StyledRingsList,
} from "./SettingsPanel.styled";

export const SettingsPanel = () => {
  const ringsContext = useRingsContext();

  const {
    state,
    actions: { addRing, setActiveRing, changeRadius, changeMass, removeRing },
  } = ringsContext;

  return (
    <StyledPanelWrapper>
      <GraphSettings />
      <StyledButtonPanel>
        <StyledButton onClick={addRing}>Add gravity ring</StyledButton>
      </StyledButtonPanel>
      <StyledRingsList>
        <For each={state.rings}>
          {(ring, index) => (
            // TODO move methods to component (use ringsContext inside)
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
