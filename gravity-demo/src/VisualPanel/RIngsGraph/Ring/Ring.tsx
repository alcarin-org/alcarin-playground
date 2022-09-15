import { mergeProps } from "solid-js";

type RingProps = {
  isActive?: boolean;
  radius: number;
};

export const Ring = (props: RingProps) => {
  const merged = mergeProps({ isActive: false }, props);

  return (
    <circle
      r={merged.radius}
      stroke="#000"
      cy="50%"
      cx="50%"
      stroke-width={merged.isActive ? 3 : 1}
      fill="none"
    />
  );
};
