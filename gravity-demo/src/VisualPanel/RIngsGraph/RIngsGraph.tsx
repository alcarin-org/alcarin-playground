import { createEffect, For } from "solid-js";
import { getRings } from "../../SettingsPanel/getRings";

import { Ring } from "./Ring/Ring";
import { StyledRingsGraphWrapper } from "./RingsGraph.styled";

export const RingsGraph = () => {
  const { rings } = getRings();

  createEffect(() =>
    // eslint-disable-next-line no-console
    console.log(rings, "rings")
  );

  return (
    <>
      <StyledRingsGraphWrapper viewBox="0 0 300 300">
        <g>
          <For each={rings}>
            {(ring) => <Ring radius={ring.radius} isActive={ring.active} />}
          </For>
        </g>
      </StyledRingsGraphWrapper>
    </>
  );
};
