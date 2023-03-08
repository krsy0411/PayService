import styled from "styled-components";

export const OverlayWrapper = ({ children }) => <div>{children}</div>;

const StyledContainer = styled.div`
  border-radius: 15px;
  background-color: white;
  /* 좌/우이동/블러정도/rgb */
  filter: drop-shadow(0, 0, 0, 0.25);
  min-height: ${(props) => props.minHeight || "0"};
`;
