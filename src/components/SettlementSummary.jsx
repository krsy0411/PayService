import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import { groupMembersState } from "../state/groupMembers";
import { currencyState } from "../state/currency";
import { useRef } from "react";
import styled from "styled-components";
import { StyledTitle } from "./AddExpenseForm";
import { getDescriptiveAmount } from "../util";

export const SettlementSummary = () => {
  const wrapperRef = useRef(null);
  const expenses = useRecoilValue(expensesState);
  const members = useRecoilValue(groupMembersState);
  const currency = useRecoilValue(currencyState);

  // 누적값, 현재값, 초기값(0) -> 소수점 2번째 자리까지 표현(반올림O)
  const totalExpenseAmount = parseFloat(
    expenses.reduce(
      (prevAmount, currentExpense) =>
        prevAmount + parseFloat(currentExpense.amount),
      0
    )
  ).toFixed(2);
  const groupMembersCnt = members ? members.length : 0;
  // 1인당 금액 : 총액 / 그룹 내 총원수
  const splitAmount = totalExpenseAmount / groupMembersCnt;
  // 총 비용, 총 인원수, 1인당 금액을 넣어서 -> 배열 안 객체 반환
  const minimumTransaction = calculateMinimumTransaction(
    expenses,
    members,
    splitAmount
  );

  return (
    <StyledWrapper ref={wrapperRef}>
      <StyledTitle>2. 정산 결과</StyledTitle>
      {totalExpenseAmount > 0 && groupMembersCnt > 0 && (
        <>
          <StyledSummary>
            <span>
              {groupMembersCnt}명이서 총{" "}
              {getDescriptiveAmount(currency, totalExpenseAmount)} 지출
            </span>
            <br />
            <span>
              한 사람 당{" "}
              {getDescriptiveAmount(currency, splitAmount.toFixed(2))}
            </span>
          </StyledSummary>

          <StyledUl>
            {minimumTransaction.map(({ sender, receiver, amount }, idx) => (
              <li key={`transaction-${idx}`}>
                <span>
                  {sender}가 {receiver}에게{" "}
                  {getDescriptiveAmount(currency, amount.toFixed(2))}원
                </span>
              </li>
            ))}
          </StyledUl>
          {/* todo : StyledUI 그리기 */}
        </>
      )}
    </StyledWrapper>
  );
};

const calculateMinimumTransaction = (expenses, members, amountPerPerson) => {
  const minimumTransactions = [];
  // 만약 아무 정보도 없으면 그냥 빈 배열 반환
  if (!expenses || !members || !amountPerPerson || amountPerPerson === 0) {
    return minimumTransactions;
  }
  // 정보들이 들어온 경우
  // 사람마다 지불해야할 값들을 객체 형태로 저장 : {A: 1000, B: 2000, C: 3000} 형태
  const membersTopay = {};
  // 1인당 금액을 우선 각자 넣어주고
  members.forEach((member) => {
    membersTopay[member] = amountPerPerson;
  });
  // 지불자의 금액은 탕감
  expenses.forEach(({ payer, amount }) => {
    membersTopay[payer] -= amount;
  });
  // 오름차순 정렬된 각자 내야할 금액 배열
  const sortedMembersToPay = Object.keys(membersTopay)
    .map((member) => {
      return { member: member, amount: membersTopay[member] };
    })
    // 오름차순 정렬 : 반환값이 true면, 앞 값이 더 큰 경우이고, false면 뒷 값이 더 큰 경우
    .sort((a, b) => a.amount - b.amount);

  var left = 0;
  var right = sortedMembersToPay.length - 1;
  while (left < right) {
    while (left < right && sortedMembersToPay[left].amount === 0) {
      left++;
    }
    while (left < right && sortedMembersToPay[right].amount === 0) {
      right--;
    }

    const toReceive = sortedMembersToPay[left];
    const toSend = sortedMembersToPay[right];
    const amountToReceive = Math.abs(toReceive.amount);
    const amountToSend = Math.abs(toSend.amount);

    if (amountToSend > amountToReceive) {
      minimumTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToReceive,
      });
      toReceive.amount = 0;
      toSend.amount -= amountToReceive;
      left++;
    } else {
      minimumTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToSend,
      });
      toSend.amount = 0;
      toReceive.amount += amountToSend;
      right--;
    }
  }
  // 배열안 객체들 반환
  return minimumTransactions;
};

const StyledWrapper = styled.div`
  padding: 1.5em;
  background-color: #683ba1;
  color: #fffbfb;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  text-align: center;
  font-size: 20px;
  position: relative;

  @media screen and (max-width: 600px) {
    font-size: 4vw;
    line-height: 6vw;
  }
`;

const StyledSummary = styled.div`
  margin-top: 1em;
`;

const StyledUl = styled.ul`
  /* 현재 컴포넌트의 font-size속성따라 크기 변경: em : default: 16px */
  margin-top: 1em;
  font-weight: 600;
  line-height: 200%;

  list-style-type: disclosure-closed;
  li::marker {
    animation: blinker 1.5s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;
