import { createContext } from "solid-js";
import { Ring } from "../SettingsPanel/RingSettings/RingSettings";
import { ChangeEvent } from "../types";

export type RingsContextModel = {
  state: {
    rings: Ring[];
    activeRing: string;
  };
  actions: {
    addRing: () => void;
    setActiveRing: (ringId: string) => void;
    changeRadius: (e: ChangeEvent, ringId: string) => void;
    changeMass: (e: ChangeEvent, ringId: string) => void;
    removeRing: (e: MouseEvent, ringId: string) => void;
  };
};

function notImplemented(): never {
  throw new Error("Missing RingsContextProvider");
}

export const RingsContext = createContext<RingsContextModel>({
  state: { rings: [], activeRing: "" },
  actions: {
    addRing: notImplemented,
    setActiveRing: notImplemented,
    changeRadius: notImplemented,
    changeMass: notImplemented,
    removeRing: notImplemented,
  },
});
