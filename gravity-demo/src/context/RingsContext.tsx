import { nanoid } from "nanoid";
import { createContext, createEffect, JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { Ring } from "../SettingsPanel/RingSettings/RingSettings";
import { ChangeEvent } from "../types";

type RingsContextType = [
  {
    rings: Ring[];
    activeRing: string;
  },
  {
    addRing: () => void;
    changeRadius: (e: ChangeEvent, ringId: string) => void;
    changeMass: (e: ChangeEvent, ringId: string) => void;
    removeRing: (e: MouseEvent, ringId: string) => void;
  }
];

function notImplemented(): never {
  throw new Error("Missing RingsContextProvider");
}

const RingsContext = createContext<RingsContextType>([
  { rings: [], activeRing: "" },
  {
    addRing: notImplemented,
    changeRadius: notImplemented,
    changeMass: notImplemented,
    removeRing: notImplemented,
  },
]);

type RingsContextProviderProps = {
  children: JSX.Element;
};

export function RingsContextProvider({ children }: RingsContextProviderProps) {
  const [state, setState] = createStore<{ rings: Ring[]; activeRing: string }>({
    rings: [],
    activeRing: "",
  });

  const handleAddRing = () => {
    const ringId = nanoid();
    setState((state) => ({
      ...state,
      rings: [
        ...state.rings,
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
    }));
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

  createEffect(() => {
    // TO INVESTIGATE - weird behaviour, in order to trigger this effect each time activeRing changes
    // I needed to use activeRing signal outside the store setter
    setState((state) => {
      const updatedList = state.rings.map((ring) => ({
        ...ring,
        active: state.activeRing === ring.id,
      }));
      return { ...state, rings: updatedList };
    });
  });

  const ringsInterface: RingsContextType = [
    state,
    {
      addRing: handleAddRing,
      changeRadius: (e: ChangeEvent, ringId: string) =>
        handleChangeRadius(e, ringId),
      changeMass: (e: ChangeEvent, ringId: string) =>
        handleChangeMass(e, ringId),
      removeRing: (e: MouseEvent, ringId: string) =>
        handleRemoveRing(e, ringId),
    },
  ];

  return (
    <RingsContext.Provider value={ringsInterface}>
      {children}
    </RingsContext.Provider>
  );
}
