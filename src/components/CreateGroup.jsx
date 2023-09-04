import { useState } from "react";
import { Form } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { groupNameState } from "../state/groupName";
import { CenteredOverlayForm } from "./shared/CenteredOverlayForm";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

export const CreateGroup = () => {
  const [validated, setValidated] = useState(false);
  // [read, write] 용도 : validation 컴포넌트를 상태관리
  const [groupName, setGroupName] = useRecoilState(groupNameState);
  // Form.Control.Feedback의 활성화 여부를 설정해주기 위한 상태관리 : [read, write]
  const [validGroupName, setValidGroupName] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    // 현재 이벤트 타겟(createGroup페이지의 Form component)
    const form = event.currentTarget;
    event.preventDefault();
    // 만약 잘못 정보가 입력된 경우 : checkValidity 함수 : 제대로 된 정보를 입력했는지 확인하는 함수
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidGroupName(false);
    } else {
      // 정보가 제대로 들어갔다면
      setValidGroupName(true);
      navigate(ROUTES.ADD_MEMBERS);
    }
    // validation form 검증을 수행했다면(틀린 정보의 경우에도)
    setValidated(true);
  };

  return (
    <CenteredOverlayForm
      title="더치페이할 그룹의 이름을 정해봅시다"
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <Form.Group>
        {/* input값이 들어올 때마다 setGroupName에 값을 저장(useRecoilState) */}
        <Form.Control
          type="text"
          required
          placeholder="2023 부산 여행"
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />

        <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
          그룹 이름을 입력해주시길 바랍니다.
        </Form.Control.Feedback>
      </Form.Group>
    </CenteredOverlayForm>
  );
};
