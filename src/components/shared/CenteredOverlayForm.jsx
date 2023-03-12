import { Button, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { Logo } from "./Logo";
import { OverlayWrapper } from "./OverlayWrapper";

export const CenteredOverlayForm = ({
  title,
  children,
  validated,
  handleSubmit,
}) => {
  return (
    <StyledCentralizedContainer>
      <Logo />
      <OverlayWrapper>
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <StyledCentralizedRowsContent>
              <Row className="align-items-start">
                <StyledTitle>{title}</StyledTitle>
              </Row>

              <Row className="align-items-center">{children}</Row>

              <Row className="align-items-end">
                <StyledSubmitButton>저장</StyledSubmitButton>
              </Row>
            </StyledCentralizedRowsContent>
          </Form>
        </Container>
      </OverlayWrapper>
    </StyledCentralizedContainer>
  );
};

const StyledCentralizedContainer = styled(Container)`
  width: 50vw;
  @media (max-width: 500px) {
    width: 80vw;
  }
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 10px;
`;

const StyledCentralizedRowsContent = styled(Row)`
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const StyledTitle = styled.h2`
  font-weight: 700;
  line-height: 35px;

  text-align: right;
  /* 글자 깨짐 방지 */
  overflow-wrap: break-word;
  word-break: keep-all;
`;

const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})`
  width: 60%;
  height: 50px;
  margin: 0 auto;
  background-color: #6610f2;
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: #6610f2;
    filter: brightness(80%);
  }
`;
