import { nanoid } from "nanoid";
import { createEffect, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import { Ring, RingSettings } from "../RingSettings/RingSettings";
import { ChangeEvent } from "../types";

import { StyledPanelWrapper, StyledRingsList } from "./SettingsPanel.styled";

export const SettingsPanel = () => {
  const [rings, setRings] = createStore<Ring[]>([]);
  const [activeRing, setActiveRing] = createSignal("");

  const handleAddRing = () => {
    const ringId = nanoid();
    setActiveRing(ringId);
    setRings((state) => [
      ...state,
      {
        id: ringId,
        radius: state.length ? state[state.length - 1].radius + 20 : 20,
        active: true,
      },
    ]);
  };

  const handleChangeRadius = (e: ChangeEvent, ringId: string) => {
    setRings((state) => {
      const updatedList = state.map((ring) =>
        ring.id === ringId
          ? { ...ring, radius: Number(e.currentTarget.value) }
          : ring
      );
      return updatedList;
    });
  };

  const handleSetActiveRing = (e: MouseEvent, ringId: string) => {
    setActiveRing(ringId);
  };

  const handleRemoveRing = (e: MouseEvent, ringId: string) => {
    setRings((state) => {
      return state.filter((ring) => ring.id !== ringId);
    });
  };

  createEffect(() => {
    // TO INVESTIGATE - weird behaviour, in order to trigger this effect each time activeRing changes
    // I needed to use activeRing signal outside the setter
    const activeRingId = activeRing();
    setRings((state) => {
      const updatedList = state.map((ring) => ({
        ...ring,
        active: activeRingId === ring.id,
      }));
      return updatedList;
    });
  });

  return (
    <StyledPanelWrapper>
      <button onClick={handleAddRing}>Add gravity ring</button>
      <StyledRingsList>
        <For each={rings}>
          {(ring, index) => (
            <RingSettings
              ring={ring}
              index={index()}
              onHover={handleSetActiveRing}
              onChangeRadius={handleChangeRadius}
              onRemoveRing={handleRemoveRing}
            />
          )}
        </For>
      </StyledRingsList>
    </StyledPanelWrapper>
  );
};
