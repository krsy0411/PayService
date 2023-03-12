import styled from "styled-components";

export const Logo = () => <StyledLogo>Dutch Pay</StyledLogo>;

const StyledLogo = styled.h1`
  font-weight: 200;
  letter-spacing: 10px;
  color: slateblue;
  text-align: center;
  /* font-size의 0.8배의 사이즈만큼 margin-bottom */
  margin-bottom: 0.8em;
`;
