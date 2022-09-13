import { createEffect, For } from "solid-js";
import { useRings } from "../../context/useRings";

import { Ring } from "./Ring/Ring";
import { StyledRingsGraphWrapper } from "./RingsGraph.styled";

export const RingsGraph = () => {
  const {
    state: { rings },
  } = useRings();

  const handleSvgClick = (e: MouseEvent) => {
    // eslint-disable-next-line no-console
    console.log(e);
  };

  return (
    <>
      <StyledRingsGraphWrapper
        viewBox="0 0 300 300"
        onClick={(e) => handleSvgClick(e)}
      >
        <g>
          <For each={rings}>
            {(ring) => <Ring radius={ring.radius} isActive={ring.active} />}
          </For>
          <circle cx="50%" cy="50%" r="3" />
        </g>
      </StyledRingsGraphWrapper>
    </>
  );
};
