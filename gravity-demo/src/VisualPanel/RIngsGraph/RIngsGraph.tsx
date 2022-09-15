import { createEffect, For, JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { useRings } from "../../context/useRings";

import { Ring } from "./Ring/Ring";
import { StyledRingsGraph, StyledRingsGraphWrapper } from "./RingsGraph.styled";

type PointerPosition = {
  x: number | null;
  y: number | null;
};

export const RingsGraph = () => {
  const { state } = useRings();

  const [pointerPosition, setPointerPosition] = createStore<PointerPosition>({
    x: null,
    y: null,
  });

  const handleSvgClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (e) => {
    const parentDimensions = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - parentDimensions.left;
    const y = e.clientY - parentDimensions.top;

    setPointerPosition({ x, y });
  };

  createEffect(() => {
    // eslint-disable-next-line no-console
    console.log(pointerPosition.x, pointerPosition.y);
  });

  return (
    <StyledRingsGraphWrapper onClick={handleSvgClick}>
      <StyledRingsGraph viewBox="0 0 300 300">
        <g>
          <For each={state.rings}>
            {(ring) => <Ring radius={ring.radius} isActive={ring.active} />}
          </For>
          <circle cx="50%" cy="50%" r="3" />
        </g>
      </StyledRingsGraph>
    </StyledRingsGraphWrapper>
  );
};
