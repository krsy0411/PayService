import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import { CreateGroup } from "./CreateGroup";

const renderComponent = () => {
  render(
    <RecoilRoot>
      <CreateGroup />
    </RecoilRoot>
  );

  const input = screen.getAllByPlaceholderText("2023 부산 여행");
  const saveButton = screen.getByText("저장");
  const errorMessage = screen.queryByText("그룹 이름을 입력해 주세요.");

  return {
    input,
    saveButton,
    errorMessage,
  };
};

describe("그룹 생성 페이지", () => {
  test("그룹 이름 컴포넌트가 렌더링 되었는가?", () => {
    const { input, saveButton } = renderComponent();

    expect(input).not.toBeNull();
    expect(saveButton).not.toBeNull();
  });

  test('그룹 이름을 입력하지 않고 "저장" 버튼을 클릭하면 에러 메시지', async () => {
    const { saveButton, errorMessage } = renderComponent();
    // 비동기
    await userEvent.click(saveButton);
    expect(errorMessage).toHaveAttribute("data-valid", "false");
  });

  test('그룹 이름을 입력하고 "저장" 버튼을 클릭하면 저장 성공', async () => {
    const { input, saveButton, errorMessage } = renderComponent();

    // 비동기
    // 유저가 그룹 이름을 입력했다는 이벤트를 확인
    await userEvent.type(input, "예시 그룹명");
    await userEvent.click(saveButton);
    // 그룹 이름이 잘 입력되었다면 CreateGroup 파일의 data-valid attr는 true
    expect(errorMessage).toHaveAttribute("data-valid", "true");
  });
});
