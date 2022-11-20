import { useContext } from "solid-js";
import { RingsContext } from "./RingsContext";

export function useRingsContext() {
  return useContext(RingsContext);
}
