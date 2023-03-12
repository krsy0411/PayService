import styled from "styled-components";
// CenteredOverlayForm에서 사용되는 컴포넌트
export const OverlayWrapper = ({ children, padding, minHeight }) => (
  <StyledContainer padding={padding} minHeight={minHeight}>
    {children}
  </StyledContainer>
);

// padding과 min-height는 인자로 받아 유동적으로 설정
const StyledContainer = styled.div`
  padding: ${(props) => props.padding || "2vw"};
  @media screen and (max-width: 600px) {
    padding: 6vw;
  }
  border-radius: 15px;
  background-color: white;
  /* 좌/우이동/블러정도/rgb */
  filter: drop-shadow(0, 4px, 4px, rgba(0, 0, 0, 0.25));
  min-height: ${(props) => props.minHeight || "0"};
`;
