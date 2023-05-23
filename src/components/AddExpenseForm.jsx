import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupMembersState } from "../state/groupMembers";
import { useState } from "react";
import { expensesState } from "../state/expenses";
import styled from "styled-components";
import { Col, Form, Row } from "react-bootstrap";
import { Button } from "bootstrap";

export const AddExpenseForm = () => {
  const members = useRecoilValue(groupMembersState);

  const today = new Date();
  // (연-월-일) 형태 : 01~09 or 10~31일
  const [date, setDate] = useState(
    [today.getFullYear, today.getMonth + 1, `0${today.getDate}`.slice(-2)].join(
      "-"
    )
  );
  // 타이핑된 데이터
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(undefined);
  const [payer, setPayer] = useState(null);

  // submit시 전체적으로 ok인지 확인할때 이용
  const [validated, setValidated] = useState(false);

  // 부분적으로 ok여부 확인할때 사용
  const [isDescValid, setIsDescValid] = useState(false);
  const [isPayerValid, setIsPayerValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);

  const setExpense = useSetRecoilState(expensesState);

  // form에 입력이 잘 이뤄졌는지 체크하는 함수
  const checkValidity = () => {
    // 값들이 타당한지 검증한 변수
    // 설명이 한 글자 이상인가?
    const descValid = desc.length > 0;
    // 지불자가 존재하는가?
    const payerValid = payer !== null;
    // 액수가 존재하며 0보다 큰가?
    const amountValid = amount !== null && amount > 0;

    // 해당 변수들의 값으로 setState
    setIsDescValid(descValid);
    setIsPayerValid(payerValid);
    setIsAmountValid(amountValid);

    // 세 검증 모두 true일때만 true 반환
    return descValid && payerValid && amountValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // checkValidity의 리턴값이 true이면
    if (checkValidity()) {
      // 검증을 true로 set
      setValidated(true);
    }
  };

  return (
    <StyledWrapper>
      <Form noValidate onSubmit={handleSubmit}>
        <StyledTitle>1. 비용 추가</StyledTitle>
        {/* 4행,5열 구성 */}
        <Row>
          {/* xs={12} : 가장 작을 때 12칸의 열 모두 차지 : 화면의 한 줄 모두 차지 */}
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="date"
                placeholder="결제한 날짜를 선택"
                // input안의 value는 초기값
                value={date}
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
                placeholder="비용에 대한 설명"
                // input안의 value는 초기값
                value={desc}
                // (e)=>setDesc(e.target.value) 또한 가능
                onChange={({ target }) => setDesc(target.value)}
                isValid={isDescValid}
                isInvalid={!isDescValid && validated}
              />
              {/* Form.Control 컴포넌트에서 ok여부를 체크해서  제대로 적으라고 피드백*/}
              <Form.Control.Feedback type="invalid" data-valid={isDescValid}>
                비용 내용을 입력해주세요
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Control
                type="number"
                placeholder="비용은 얼마였나요?"
                // input 안의 value는 초기값
                value={amount}
                isInvalid={!isAmountValid && validated}
                isValid={isAmountValid}
                onChange={({ target }) => setAmount(target.value)}
                // 이 두 가지 속성은 뭔지 모르겠음
                min="0"
                step="0.01"
              />
              <Form.Control.Feedback type="invalid" data-valid={isAmountValid}>
                1원 이상의 금액을 입력해주세요
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>

          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Select
                defaultValue=""
                isValid={isPayerValid}
                isInvalid={!isPayerValid && validated}
                className="form-control"
                onChange={({ target }) => setPayer(target.value)}
              >
                <option disabled value="">
                  누가 결제 했나요?
                </option>
                {/* memberState를 받아와서 member 데이터들을 옵션으로 추가 */}
                {members &&
                  members.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid" data-valid={isPayerValid}>
                결제자를 선택해야 합니다
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
  border: 0;
  border-radius: 8px;
  background-color: #e2d9f3;
  color: #59359a;
  margin-top: 10px;

  &:focus,
  &:hover {
    background-color: #e2d9f3;
    filter: rgba(0, 0, 0, 0.3);
  }
`;
