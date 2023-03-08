import { Container } from "react-bootstrap";
import styled from "styled-components";
import { OverlayWrapper } from "./shared/OverlayWrapper";

export const CenteredOverlayForm = ({ children }) => {
  return (
    <CentralizedContainer>
      <h1>Dutch Pay Service</h1>
      <OverlayWrapper>{children}</OverlayWrapper>
    </CentralizedContainer>
  );
};

const CentralizedContainer = styled(Container)``;
