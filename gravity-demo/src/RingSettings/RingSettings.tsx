import { ChangeEvent } from "../types";

import { StyledLabel, StyledRingWrapper } from "./RingSettings.styled";

export type Ring = {
  id: string;
  radius: number;
  active: boolean;
};

type RingSettingsProps = {
  onHover: (e: MouseEvent, ringId: string) => void;
  onChangeRadius: (e: ChangeEvent, id: string) => void;
  onRemoveRing: (e: MouseEvent, id: string) => void;
  ring: Ring;
  index: number;
};

export const RingSettings = ({
  onHover,
  ring,
  onChangeRadius,
  index,
  onRemoveRing,
}: RingSettingsProps) => {
  const inputId = `input-${ring.id}`;

  return (
    <StyledRingWrapper onMouseOver={(e) => onHover(e, ring.id)}>
      <StyledLabel for={inputId} active={ring.active}>
        Ring {index + 1}
      </StyledLabel>
      <input
        type="number"
        id={inputId}
        onChange={(e) => onChangeRadius(e, ring.id)}
        value={ring.radius}
      />
      <button onClick={(e) => onRemoveRing(e, ring.id)}>Remove ring</button>
    </StyledRingWrapper>
  );
};
