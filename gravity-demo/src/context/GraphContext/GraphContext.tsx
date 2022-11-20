import { createContext } from "solid-js";
import { ChangeEvent } from "../../types";
import { notImplemented } from "../common/notImplemented";

type GraphDimensions = {
  width: number;
  height: number;
};

export type GraphContextModel = {
  state: GraphDimensions;
  actions: {
    setGraphWidth: (e: ChangeEvent) => void;
    setGraphHeight: (e: ChangeEvent) => void;
  };
};

const graphDimensionsDefaults = {
  width: 0,
  height: 0,
};

export const GraphContext = createContext<GraphContextModel>({
  state: graphDimensionsDefaults,
  actions: {
    setGraphHeight: notImplemented,
    setGraphWidth: notImplemented,
  },
});
