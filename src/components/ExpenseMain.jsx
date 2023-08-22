import { Col, Container, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useGroupData } from "../hooks/useGroupData";
import { Logo } from "./shared/Logo";
import { groupNameState } from "../state/groupName";
import { AddExpenseForm } from "./AddExpenseForm";
import { ExpenseTalbe } from "./ExpenseTable";
import { SettlementSummary } from "./SettlementSummary";

export const ExpenseMain = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>
    </Container>
  );
};

const LeftPane = () => (
  <StyledLeftContainer>
    <StyledGapRow>
      <Row>
        <Logo />
      </Row>
      <Row>
        <AddExpenseForm />
      </Row>
      <Row>
        <SettlementSummary />
      </Row>
    </StyledGapRow>
  </StyledLeftContainer>
);

const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);

  return (
    <StyledRightPaneWrapper>
      <Row>
        <StyledGroupName>{groupName || "그룹 이름"}</StyledGroupName>
      </Row>
      <Row>
        <ExpenseTalbe />
      </Row>
    </StyledRightPaneWrapper>
  );
};

const StyledGroupName = styled.h2`
  margin-bottom: 6vh;
  font-weight: 700;
  font-size: 40px;
  text-align: center;
  @media screen and (max-width: 600px) {
    font-size: 9vw;
    margin-bottom: 30px;
  }
`;

const StyledGapRow = styled(Row)`
  gap: 3vh;
  padding-top: 4vh;
  justify-content: center;

  @media screen and (max-width: 600px) {
    padding-top: 30px;
  }
`;

const StyledRightPaneWrapper = styled(Container)`
  /* top right bottom left */
  padding: 5vh 2vw 2vh 2vw;

  @media screen and (max-width: 600px) {
    /* 수직 수평 */
    padding: 50px 25px;
  }
`;

const StyledLeftContainer = styled(Container)`
  align-items: center;
`;
