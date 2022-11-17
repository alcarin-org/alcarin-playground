import { createStore } from "solid-js/store";
import { ChangeEvent } from "../../types";
import { GraphContextModel } from "./GraphContext";

type GraphContextProviderProps = {
  graphWidth?: number;
  graphHeight?: number;
};

export const GraphContextProvider = (props: GraphContextProviderProps) => {
  const [state, setState] = createStore({
    graphWidth: props.graphWidth || null,
    grapHeight: props.graphHeight || null,
  });

  const handleSetGraphWidth = (e: ChangeEvent) => {
    setState((state) => ({
      graphHeight: state.grapHeight,
      graphWidth: Number(e.currentTarget.value),
    }));
  };

  const handleSetGraphHeight = (e: ChangeEvent) => {
    setState((state) => ({
      graphHeight: Number(e.currentTarget.value),
      graphWidth: state.graphWidth,
    }));
  };

  const graphContextInterface: GraphContextModel = {
    state: {
      graph: {
        width: state.graphWidth,
        height: state.grapHeight,
      },
    },
    actions: {
      setGraphHeight: handleSetGraphHeight,
      setGraphWidth: handleSetGraphWidth,
    },
  };
};
