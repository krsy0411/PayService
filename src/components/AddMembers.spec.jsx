import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AddMembers } from "./AddMembers";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <RecoilRoot>
        <AddMembers />
      </RecoilRoot>
    </BrowserRouter>
  );

  const input = screen.getByTestId("input-member-names");
  const saveButton = screen.getByText("저장");

  return {
    input,
    saveButton,
  };
};

describe("그룹 멤버 이름 추가 페이지", () => {
  test("멤버 이름 입력 컴포넌트가 렌더링 되었는가?", () => {
    const { input, saveButton } = renderComponent();

    expect(input).not.toBeNull();
    expect(saveButton).not.toBeNull();
  });

  test("그룹 멤버를 입력하지 않고 '저장'버튼을 클릭하면, 에러 메세지 노출", async () => {
    const { saveButton } = renderComponent();

    userEvent.click(saveButton);
    const errorMessage = await screen.findByText(
      "그룹 멤버들 이름을 입력해 주세요."
    );
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("그룹 멤버 이름을 입력한 후, 저장 버튼을 클릭하면 저장에 성공", async () => {
    const { input, saveButton } = renderComponent();

    userEvent.type(input, "철수 영희 철구");
    userEvent.click(saveButton);

    const errorMessage = screen.queryByText(
      "그룹 멤버들의 이름을 입력해 주세요"
    );
    await waitFor(() => {
      expect(errorMessage).toBeNull();
    });
  });
});
