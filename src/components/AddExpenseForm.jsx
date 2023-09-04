import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupMembersState } from "../state/groupMembers";
import { useState } from "react";
import styled from "styled-components";
import { Col, Form, Row, Button } from "react-bootstrap";
import { expensesState } from "../state/expenses";

export const AddExpenseForm = () => {
  const members = useRecoilValue(groupMembersState);
  // 날짜 설정을 위한 Date객체
  const today = new Date();
  const [date, setDate] = useState(
    [
      today.getFullYear(),
      today.getMonth() + 1,
      `0${today.getDate()}`.slice(-2),
    ].join("-")
  );
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(undefined);
  const [payer, setPayer] = useState(null);
  const [validated, setValidated] = useState(false);

  const [isDescValid, setIsDescValid] = useState(false);
  const [isPayerValid, setIsPayerValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);

  const setExpense = useSetRecoilState(expensesState);

  const checkValidity = () => {
    const descValid = desc.length > 0;
    const payerValid = payer !== null;
    const amountValid = !!amount && amount > 0;

    setIsDescValid(descValid);
    setIsPayerValid(payerValid);
    setIsAmountValid(amountValid);

    return descValid && payerValid && amountValid;
  };

  // todo : 추가하기 버튼 눌렀을때 정보 넘기기
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (checkValidity()) {
      setValidated(true);
      // 이전 값들도 누적되어 보이도록
      setExpense((expenses) => [...expenses, { date, desc, amount, payer }]);
    }
    setValidated(true);
  };

  return (
    <StyledWrapper>
      <Form noValidate onSubmit={handleSubmit}>
        <StyledTitle>1. 비용 추가하기</StyledTitle>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="date"
                placeholder="결제한 날짜를 선택해 주세요"
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
              />
            </StyledFormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="text"
                isInvalid={!isDescValid && validated}
                isValid={isDescValid}
                placeholder="비용에 대한 설명을 입력해 주세요"
                value={desc || ""}
                onChange={({ target }) => setDesc(target.value)}
              />
              <Form.Control.Feedback type="invalid" data-valid={isDescValid}>
                비용 내용을 입력해 주셔야 합니다.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="비용은 얼마였나요?"
                min="0"
                value={amount || ""}
                isInvalid={!isAmountValid && validated}
                isValid={isAmountValid}
                onChange={({ target }) => setAmount(target.value)}
              />
              <Form.Control.Feedback data-valid={isAmountValid} type="invalid">
                1원 이상의 금액을 입력해 주셔야 합니다.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Select
                isValid={isPayerValid}
                isInvalid={!isPayerValid && validated}
                defaultValue=""
                className="form-control"
                onChange={({ target }) => setPayer(target.value)}
              >
                <option disabled value="">
                  누가 결제 했나요?
                </option>
                {members &&
                  members.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback data-valid={isPayerValid} type="invalid">
                결제자를 선택해 주셔야 합니다.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="d-grid gap-2">
            <StyledSubmitButton>추가하기</StyledSubmitButton>
          </Col>
        </Row>
      </Form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 40px;
  background-color: #683ba1;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;

export const StyledTitle = styled.h3`
  color: #fffbfb;
  text-align: center;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  /* 글자간 간격 */
  letter-spacing: 0.25px;
  margin-bottom: 15px;
  /* 600px이하일때만 적용 */
  @media screen and (max-width: 600px) {
    font-size: 5.5vw;
    line-height: 6vw;
  }
`;

// 리액트 부트스트랩 : <Form.Group> 컴포넌트 스타일 정의
const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 15px;
  // input,select태그의 스타일을 따로 설장
  input,
  select {
    background-color: #59359a;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 0;
    color: #f8f9fa;
    height: 40px;
    // 커서가 선택한 순간, &는 부모선택자 의미
    &:focus {
      color: #f8f9fa;
      background-color: #59359a;
      filter: brightness(80%);
    }
    // placeholder의 글씨만 처리(:: - 요소의 일부분 처리 - 블록 요소에 적용할 것)
    ::placeholder {
      color: #f8f9fa;
    }
  }
`;

const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})`
  height: 45px;
  border: 0px;
  border-radius: 8px;
  background-color: #e2d9f3;
  color: #59359a;
  margin-top: 10px;

  &:hover,
  &:focus {
    background-color: #e2d9f3;
    filter: rgba(0, 0, 0, 0.3);
  }
`;
