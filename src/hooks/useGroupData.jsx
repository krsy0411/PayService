import { useRecoilState } from "recoil";
import { groupNameState } from "../state/groupName";
import { groupMembersState } from "../state/groupMembers";

export const useGroupData = () => {
  const [groupName, setGroupName] = useRecoilState(groupNameState);
  const [groupMembers, setMembers] = useRecoilState(groupMembersState);

  return {
    groupName,
    groupMembers,
  };
};
