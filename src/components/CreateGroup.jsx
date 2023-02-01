import { Container, Form, Row, Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { CenteredOverlayForm } from "./CenteredOverlayForm";

export const CreateGroup = () => {
  const [groupName, setGroupName] = useRecoilState;

  return (
    <div>
      <h1>Dutch Pay Service</h1>

      <Container>
        <Form noValidate>
          <Row>
            <h2>더치 페이 할 그룹의 이름 정하기</h2>
          </Row>

          <Row>
            <Form.Group controlId="validationGroupName">
              <Form.Control type="text" required placeholder="2023 부산 여행" />

              <Form.Control.Feedback type="invalid">
                그룹 이름을 입력해주시길 바랍니다.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Button type="submit">저장</Button>
          </Row>
        </Form>
      </Container>

      {/* <CenteredOverlayForm /> */}
    </div>
  );
};
