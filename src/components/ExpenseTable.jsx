import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import { OverlayWrapper } from "./shared/OverlayWrapper";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import { getDescriptiveAmount } from "../util";
import { currencyState } from "../state/currency";

export const ExpenseTalbe = () => {
  const expenses = useRecoilValue(expensesState);
  const currency = useRecoilValue(currencyState);

  return (
    <OverlayWrapper minHeight={"73vh"}>
      <StyledTable borderless hover responsive>
        <StyledThead>
          <tr>
            <th>날짜</th>
            <th>내용</th>
            <th>결제자</th>
            <th>금액</th>
            <th></th>
          </tr>
        </StyledThead>
        <StyledBody>
          {expenses.map(({ date, desc, amount, payer }, idx) => (
            <tr key={`expense-${idx}`}>
              <td>{date}</td>
              <td>{desc}</td>
              <td>{payer}</td>
              <td>{getDescriptiveAmount(currency, amount)}</td>
            </tr>
          ))}
        </StyledBody>
      </StyledTable>
    </OverlayWrapper>
  );
};

const StyledTable = styled(Table)`
  /* 600px이상에선 450px이 최소 가로 넓이*/
  min-width: 450px;
  /* 600px까지는 최소 넓이 300px */
  @media screen and (max-width: 600px) {
    min-width: 300px;
  }
`;

const StyledThead = styled.thead`
  color: #6b3da6;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;

  th {
    /* 수직 수평 */
    padding: 15px 8px;
    min-width: 60px;
  }
  @media screen and (max-width: 600px) {
    font-size: 4vw;
    line-height: 10px;
    th {
      padding: 10px 4px;
    }
  }
`;

const StyledBody = styled.tbody`
  td {
    font-weight: 400;
    font-size: 20px;
    line-height: 50px;
    text-align: center;

    @media screen and (max-width: 600px) {
      font-size: 4vw;
      line-height: 20px;
    }
  }
`;
