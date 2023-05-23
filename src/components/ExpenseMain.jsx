import { Col, Container, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useGroupData } from "../hooks/useGroupData";
import { Logo } from "./shared/Logo";
import { groupNameState } from "../state/groupName";

export const ExpenseMain = () => {
  useGroupData();

  return (
    // Container : 리액트 부트스트랩에서 grid형식의 레이아웃 형태를 만들 때의 기본적인 요소
    // fluid : 반응형 웹에서 화면을 100% 채우도록 유지시키는 attrs
    <Container fluid>
      <Row>
        {/* 화면의 크기는 xs, sm, md, lg, xl 순 : 12개의 칸 중 몇 칸을 차지할 지 비율 설정 */}
        <Col xs={12} sm={5} md={4}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>

      <StyledShareButton></StyledShareButton>
    </Container>
  );
};

const StyledGapRow = styled(Row)`
  /* 인접 요소가 존재하면 빈 공간을 만들어줌 */
  gap: 5vh;
  /* 내부 여백 설정 */
  padding: 100px 31px 100px 31px;
  /* 600px 이하일때는 패딩값 다르게 */
  @media screen and (max-width: 600px) {
    padding: 50px 25px;
  }
`;

const LeftPane = () => {
  <Container>
    <StyledGapRow>
      <Row>
        <Logo />
      </Row>

      <Row></Row>

      <Row></Row>
    </StyledGapRow>
  </Container>;
};

const RightPane = () => {
  // groupNameState로부터 저장된 groupName을 가져옴
  const groupName = useRecoilValue(groupNameState);

  // 리액트 부트스트랩 : 행렬구성 : 컨텐츠를 1열 2행으로 구성
  return (
    <StyledRightPaneWrapper>
      <Row>
        <StyledGroupName>{groupName || "그룹 이름"}</StyledGroupName>
      </Row>
      <Row></Row>
    </StyledRightPaneWrapper>
  );
};

const StyledRightPaneWrapper = styled(Container)`
  /* 상 우 하 좌 - 시계방향 */
  padding: 100px 31px 100px 31px;

  @media screen and (max-width: 600px) {
    /* 상하 좌우 */
    padding: 50px 25px;
  }
`;

const StyledGroupName = styled.h2`
  margin-bottom: 6vh;
  font-weight: 700;
  font-size: 40px;
  line-height: 40px;
  text-align: center;
  /* 화면의 최대 너비 : 600px - 화면 너비가 600px 이하일때 적용*/
  @media screen and (max-width: 600px) {
    font-size: 9vw;
    margin-bottom: 30px;
  }
`;

const StyledShareButton = styled.div`
  border-radius: 50%;
  background-color: #683da6;
  position: fixed;
  width: 55px;
  right: 40px;
  bottom: 45px;
  filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.25));
  color: white;
  font-size: 30px;
  text-align: center;
`;
