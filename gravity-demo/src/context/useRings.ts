import { useContext } from "solid-js";
import { RingsContext } from "./RingsContext";

export function useRings() {
  return useContext(RingsContext);
}
