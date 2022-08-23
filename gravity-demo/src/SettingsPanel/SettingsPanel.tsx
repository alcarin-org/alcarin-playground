import { nanoid } from "nanoid";
import { createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";

import { StyledPanelWrapper } from "./SettingsPanel.styled";

type Ring = {
  id: string;
  radius: number;
};

export const SettingsPanel = () => {
  const [rings, setRings] = createStore<Ring[]>([]);
  const [activeRing, setActiveRing] = createSignal("");

  const handleAddRing = () => {
    const ringId = nanoid();
    setRings((state) => [
      ...state,
      {
        id: ringId,
        radius: state.length ? state[state.length - 1].radius + 20 : 20,
        active: ringId === activeRing(),
      },
    ]);
    setActiveRing(ringId);
  };

  return (
    <StyledPanelWrapper>
      <button onClick={handleAddRing}>Add gravity ring</button>
      <For each={rings}>
        <RingSettings />
      </For>
    </StyledPanelWrapper>
  );
};
