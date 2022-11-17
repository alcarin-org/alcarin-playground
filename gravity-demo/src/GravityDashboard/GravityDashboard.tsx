import { SettingsPanel } from "../SettingsPanel/SettingsPanel";
import { VisualPanel } from "../VisualPanel/VisualPanel";
import { StyledDashboardWrapper } from "./GravityDashboard.styled";

export const GravityDashboard = () => {
  return (
    <StyledDashboardWrapper>
      <SettingsPanel />
      <VisualPanel />
    </StyledDashboardWrapper>
  );
};
