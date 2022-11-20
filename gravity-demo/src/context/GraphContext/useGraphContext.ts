import { useContext } from "solid-js";
import { GraphContext } from "./GraphContext";

export const useGraphContext = () => {
  return useContext(GraphContext);
};
