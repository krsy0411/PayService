import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ExpenseMain } from "./ExpenseMain";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <RecoilRoot>
        <ExpenseMain />
      </RecoilRoot>
    </BrowserRouter>
  );
  // 정규표현식
  const dateInput = screen.getByPlaceholderText(/결제한 날짜/);
  const desInput = screen.getByPlaceholderText(/비용에 대한 설명/);
  const amountInput = screen.getByPlaceholderText(/비용은 얼마/);
  const payerInput = screen.getByPlaceholderText(/누가 결제/);
  const addButton = screen.getByText("추가하기");

  return {
    dateInput,
    desInput,
    amountInput,
    payerInput,
    addButton,
  };
};

describe("비용 정산 페이지 - 메인", () => {
  describe("비용 추가 컴포넌트", () => {
    test("비용을 추가하는 컴포넌트가 렌더링 되었는가?", () => {
      const { dateInput, descInput, amountInput, payerInput, addButton } =
        renderComponent();
      // 컴포넌트들이 Doc안에 존재하는지 확인
      expect(dateInput).toBeInTheDocument();
      expect(descInput).toBeInTheDocument();
      expect(amountInput).toBeInTheDocument();
      expect(payerInput).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    });

    test("비용 추가 컴포넌트에서의 필수 입력 값을 작성하지 않고 '추가' 버튼을 입력하면, 에러 메세지를 보여주기", async () => {
      const { addButton } = renderComponent();

      // 이 코드대로 실행되면, 다른 입력컴포넌트들은 선택된 적 없이 바로 추가버튼이 눌린 경우가 된다
      expect(addButton).toBeInTheDocument();
      await userEvent.click(addButton);

      const descErrorMessage = screen.getByText(
        "비용 내용을 입력해 주셔야 합니다."
      );
      expect(descErrorMessage).toBeInTheDocument();

      const payerErrorMessage =
        screen.getByText("결제자를 선택해 주셔야 합니다.");
      expect(payerErrorMessage).toBeInTheDocument();

      const amountErrorMessage =
        screen.getByText("금액을 입력해 주셔야 합니다.");
      expect(amountErrorMessage).toBeInTheDocument();
    });

    test('비용 추가 컴포넌트에 필수 값들을 입력한 후 "추가" 버튼을 입력하면, 저장 성공', async () => {
      const { descInput, amountInput, payerInput, addButton } =
        renderComponent();
      // 유저가 타이핑을 했을 경우
      await userEvent.type(descInput, "장보기");
      await userEvent.type(amountInput, "30000");
      // payerList에 멤버들 이름이 입력되어 있을 경우에만 가능 : '영수' 선택
      await userEvent.selectOptions(payerInput, "영수");
      await userEvent.click(addButton);
      // getBy 대신 queryBy 쓰는 이유 : 저장에 성공하는 경우, 에러메세지는 뜨지 않는데, getBy는 html dom트리 안에 에러메세지가 존재해야 값을 가져오기 때문
      const descErrorMessage = screen.queryByText(
        "비용 내용을 입력해 주셔야 합니다."
      );
      // desc에러메세지가 doc안에 없음을 원함
      expect(descErrorMessage).not.toBeInTheDocument();

      const payerErrorMessage =
        screen.queryByText("결제자를 선택해 주셔야 합니다.");
      expect(payerErrorMessage).not.toBeInTheDocument();

      const amountErrorMessage =
        screen.queryByText("금액을 입력해 주셔야 합니다.");
      expect(amountErrorMessage).not.toBeInTheDocument();
    });
  });
});
