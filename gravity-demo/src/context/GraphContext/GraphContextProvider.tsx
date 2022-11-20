import { JSX } from "solid-js/jsx-runtime";
import { createStore } from "solid-js/store";
import { ChangeEvent } from "../../types";
import { GraphContext, GraphContextModel } from "./GraphContext";

type GraphContextProviderProps = {
  graphWidth: number;
  graphHeight: number;
  children: JSX.Element;
};

export const GraphContextProvider = (props: GraphContextProviderProps) => {
  const [state, setState] = createStore({
    width: props.graphWidth,
    height: props.graphHeight,
  });

  const handleSetGraphWidth = (e: ChangeEvent) => {
    setState((state) => ({
      height: state.height,
      width: Number(e.currentTarget.value),
    }));
  };

  const handleSetGraphHeight = (e: ChangeEvent) => {
    setState((state) => ({
      height: Number(e.currentTarget.value),
      width: state.width,
    }));
  };

  const graphContextInterface: GraphContextModel = {
    state,
    actions: {
      setGraphHeight: handleSetGraphHeight,
      setGraphWidth: handleSetGraphWidth,
    },
  };

  return (
    <GraphContext.Provider value={graphContextInterface}>
      {props.children}
    </GraphContext.Provider>
  );
};
