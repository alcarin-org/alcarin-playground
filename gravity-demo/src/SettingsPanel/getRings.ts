import { nanoid } from "nanoid";
import { createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { Ring } from "./RingSettings/RingSettings";
import { ChangeEvent } from "../types";

export const getRings = () => {
  const [rings, setRings] = createStore<Ring[]>([
    {
      id: "13126562",
      radius: 20,
      mass: 300,
      active: true,
    },
    {
      id: "131265762",
      radius: 50,
      mass: 350,
      active: false,
    },
  ]);
  const [activeRing, setActiveRing] = createSignal(
    rings.find((ring) => ring.active)?.id || ""
  );

  const handleAddRing = () => {
    const ringId = nanoid();
    setActiveRing(ringId);
    setRings((state) => [
      ...state,
      {
        id: ringId,
        radius: state.length ? state[state.length - 1].radius + 20 : 20,
        mass: state.length ? state[state.length - 1].mass + 15 : 15,
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

  const handleChangeMass = (e: ChangeEvent, ringId: string) => {
    setRings((state) => {
      const updatedList = state.map((ring) =>
        ring.id === ringId
          ? { ...ring, mass: Number(e.currentTarget.value) }
          : ring
      );
      return updatedList;
    });
  };

  const handleRemoveRing = (e: MouseEvent, ringId: string) => {
    setRings((state) => {
      return state.filter((ring) => ring.id !== ringId);
    });
  };

  createEffect(() => {
    // TO INVESTIGATE - weird behaviour, in order to trigger this effect each time activeRing changes
    // I needed to use activeRing signal outside the store setter
    const activeRingId = activeRing();
    setRings((state) => {
      const updatedList = state.map((ring) => ({
        ...ring,
        active: activeRingId === ring.id,
      }));
      return updatedList;
    });
  });
  return {
    rings,
    setActiveRing,
    handleAddRing,
    handleChangeRadius,
    handleChangeMass,
    handleRemoveRing,
  };
};
