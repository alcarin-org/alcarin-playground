import { nanoid } from "nanoid";
import { createEffect, JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { Ring } from "../SettingsPanel/RingSettings/RingSettings";
import { ChangeEvent } from "../types";
import { RingsContext, RingsContextModel } from "./RingsContext";

type RingsContextProviderProps = {
  children: JSX.Element;
  rings: Ring[];
  activeRing: string;
};

export function RingsContextProvider(props: RingsContextProviderProps) {
  const [state, setState] = createStore<{ rings: Ring[]; activeRing: string }>({
    rings: props.rings || [],
    activeRing: props.activeRing || "",
  });

  const handleAddRing = () => {
    const ringId = nanoid();
    setState((state) => {
      const updatedRingsElements = state.rings.map((ring) => ({
        ...ring,
        active: false,
      }));
      return {
        ...state,
        rings: [
          ...updatedRingsElements,
          {
            id: ringId,
            radius: state.rings.length
              ? state.rings[state.rings.length - 1].radius + 20
              : 20,
            mass: state.rings.length
              ? state.rings[state.rings.length - 1].mass + 15
              : 15,
            active: true,
          },
        ],
        activeRing: ringId,
      };
    });
  };

  const handleChangeRadius = (e: ChangeEvent, ringId: string) => {
    setState((state) => {
      const updatedList = state.rings.map((ring) =>
        ring.id === ringId
          ? { ...ring, radius: Number(e.currentTarget.value) }
          : ring
      );
      return { ...state, rings: updatedList };
    });
  };

  const handleChangeMass = (e: ChangeEvent, ringId: string) => {
    setState((state) => {
      const updatedList = state.rings.map((ring) =>
        ring.id === ringId
          ? { ...ring, mass: Number(e.currentTarget.value) }
          : ring
      );
      return { ...state, rings: updatedList };
    });
  };

  const handleRemoveRing = (e: MouseEvent, ringId: string) => {
    setState((state) => {
      const updatedList = state.rings.filter((ring) => ring.id !== ringId);
      return { ...state, rings: updatedList };
    });
  };

  const handleSetActiveRing = (ringId: string) => {
    const updatedList = state.rings.map((ring) => ({
      ...ring,
      active: ringId === ring.id,
    }));
    setState((state) => ({ ...state, rings: updatedList, activeRing: ringId }));
  };

  const ringsInterface: RingsContextModel = {
    state,
    actions: {
      addRing: handleAddRing,
      setActiveRing: (ringId: string) => handleSetActiveRing(ringId),
      changeRadius: (e: ChangeEvent, ringId: string) =>
        handleChangeRadius(e, ringId),
      changeMass: (e: ChangeEvent, ringId: string) =>
        handleChangeMass(e, ringId),
      removeRing: (e: MouseEvent, ringId: string) =>
        handleRemoveRing(e, ringId),
    },
  };

  return (
    <RingsContext.Provider value={ringsInterface}>
      {props.children}
    </RingsContext.Provider>
  );
}
