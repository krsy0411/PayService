import { useState } from "react";
import { Container, Form, Row, Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { groupNameState } from "../state/groupName";
import { CenteredOverlayForm } from "./shared/CenteredOverlayForm";

export const CreateGroup = () => {
  const [validated, setValidated] = useState(false);
  // [read, write] 용도 : validation 컴포넌트를 상태관리
  const [groupName, setGroupName] = useRecoilState(groupNameState);
  // Form.Control.Feedback의 활성화 여부를 설정해주기 위한 상태관리 : [read, write]
  const [validGroupName, setValidGroupName] = useState(false);

  const handleSubmit = (event) => {
    // 현재 이벤트 타겟(createGroup페이지의 Form component)
    const form = event.currentTarget;
    event.preventDefault();
    // 만약 잘못 정보가 입력된 경우 : checkValidity 함수 : 제대로 된 정보를 입력했는지 확인하는 함수
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidGroupName(false);
    } else {
      setValidGroupName(true);
    }
    // validation form 검증을 수행했다면(틀린 정보의 경우에도)
    setValidated(true);
  };

  return (
    <CenteredOverlayForm>
      <Container>
        <StyledRow>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="align-items-start">
              <h2>더치 페이 할 그룹의 이름 정하기</h2>
            </Row>

            <Row className="align-items-center">
              <Form.Group controlId="validationGroupName">
                {/* input값이 들어올 때마다 setGroupName에 값을 저장(useRecoilState) */}
                <Form.Control
                  type="text"
                  required
                  placeholder="2023 부산 여행"
                  onChange={(e) => setGroupName(e.target.value)}
                />

                <Form.Control.Feedback
                  type="invalid"
                  data-valid={validGroupName}
                >
                  그룹 이름을 입력해주시길 바랍니다.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="align-items-end">
              <Button type="submit">저장</Button>
            </Row>
          </Form>
        </StyledRow>
      </Container>
    </CenteredOverlayForm>
  );
};

const StyledRow = styled(Row)`
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const StyledSubmitButton = styled(Button)`
  background-color: #6610f2;
  border-radius: 8px;

  &:hover {
    background-color: #6610f2;
    filter: brightness(80%);
  }
`;
