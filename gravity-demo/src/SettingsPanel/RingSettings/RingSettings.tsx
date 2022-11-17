import { StyledButton } from "../../components/StyledButton";
import {
  StyledInput,
  StyledInputWrapper,
  StyledLabel,
} from "../../components/StyledInput";
import { ChangeEvent } from "../../types";

import {
  StyledHeader,
  StyledRingWrapper,
  StyledTitle,
} from "./RingSettings.styled";

export type Ring = {
  id: string;
  radius: number;
  mass: number;
  active: boolean;
};

type RingSettingsProps = {
  onHover: (e: MouseEvent, ringId: string) => void;
  onChangeRadius: (e: ChangeEvent, id: string) => void;
  onChangeMass: (e: ChangeEvent, id: string) => void;
  onRemoveRing: (e: MouseEvent, id: string) => void;
  ring: Ring;
  index: number;
};

export const RingSettings = ({
  onHover,
  ring,
  onChangeRadius,
  index,
  onChangeMass,
  onRemoveRing,
}: RingSettingsProps) => {
  const radiusId = `radius-${ring.id}`;
  const massId = `mass-${ring.id}`;

  return (
    <StyledRingWrapper
      onMouseOver={(e) => onHover(e, ring.id)}
      active={ring.active}
    >
      <StyledHeader>
        <StyledTitle> Ring {index + 1}</StyledTitle>
        <StyledButton onClick={(e) => onRemoveRing(e, ring.id)}>
          Remove
        </StyledButton>
      </StyledHeader>
      <StyledInputWrapper>
        <StyledLabel for={radiusId}>Radius</StyledLabel>
        <StyledInput
          type="number"
          id={radiusId}
          onChange={(e) => onChangeRadius(e, ring.id)}
          value={ring.radius}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <StyledLabel for={massId}>Mass</StyledLabel>
        <StyledInput
          type="number"
          id={massId}
          onChange={(e) => onChangeMass(e, ring.id)}
          value={ring.mass}
        />
      </StyledInputWrapper>
    </StyledRingWrapper>
  );
};
