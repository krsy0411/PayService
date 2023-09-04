import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CenteredOverlayForm } from "./shared/CenteredOverlayForm";
import { groupMembersState } from "../state/groupMembers";
import { groupNameState } from "../state/groupName";
import { InputTags } from "react-bootstrap-tagsinput";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

export const AddMembers = () => {
  // groupMembersState의 key name : groupMembers
  const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
  // groupNameState의 key name : groupName
  const groupName = useRecoilValue(groupNameState);
  const [validated, setValidated] = useState(false);
  // 상태관리 recoil로부터 가져옴
  const header = `먼저, ${groupName} 그룹에 속한 사람들의 이름을 적어볼게요`;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // form 안에서 submit 버튼을 눌렀어도 새로 실행하지 않도록 막는 문장
    e.preventDefault();
    // '저장'버튼을 클릭하면 validated를 true로
    setValidated(true);
    navigate(ROUTES.EXPENSE_MAIN);
  };

  return (
    <CenteredOverlayForm
      title={header}
      validated={validated}
      handleSubmit={handleSubmit}
    >
      {/* 상태관리 recoil로부터 가져옴 */}
      <InputTags
        values={groupMembers}
        placeholder="이름 간 띄어쓰기"
        // 태그 값이 넘어오면 setGroupMembers에 상태저장
        onTags={(value) => setGroupMembers(value.values)}
      />
      {/* 저장 시 실행되는 handleSubmit이 작동하여 validated가 true가 되고, 저장된 그룹멤버가 없으면 */}
      {validated && groupMembers.length === 0 && (
        <StyledErrorMessage>
          그룹 멤버들의 이름을 입력해주세요
        </StyledErrorMessage>
      )}
    </CenteredOverlayForm>
  );
};

const StyledErrorMessage = styled.span`
  color: red;
`;
