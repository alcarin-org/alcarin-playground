import { createContext } from "solid-js";
import { ChangeEvent } from "../../types";
import { notImplemented } from "../common/notImplemented";

type GraphDimensions = {
  width: number | null;
  height: number | null;
};

export type GraphContextModel = {
  state: {
    graph: GraphDimensions;
  };
  actions: {
    setGraphWidth: (e: ChangeEvent) => void;
    setGraphHeight: (e: ChangeEvent) => void;
  };
};

const graphDimensionsDefaults = {
  width: null,
  height: null,
};

export const GraphContext = createContext<GraphContextModel>({
  state: { graph: graphDimensionsDefaults },
  actions: {
    setGraphHeight: notImplemented,
    setGraphWidth: notImplemented,
  },
});
