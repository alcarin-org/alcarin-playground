type RingProps = {
  isActive?: boolean;
  radius: number;
};

export const Ring = ({ isActive = false, radius }: RingProps) => {
  return (
    <circle
      r={radius}
      stroke="#000"
      cy="50%"
      cx="50%"
      stroke-width={isActive ? 3 : 1}
      fill="none"
    />
  );
};
