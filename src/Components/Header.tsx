import { Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "./Button";
import { FiEdit } from "react-icons/fi";
import styles from "../Note.module.css";
type Props = {};

function Header({}: Props) {
  return (
    <>
      <Row className="align-item-center  header">
        <Col className="d-flex flex-column align-items-start ">
          <h1 className={`mb-0 ${styles.title}`}>NoteTakingApp</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/notes/new">
              <Button onClick={() => null} color="green">
                <span>Create</span>
                <FiEdit />
              </Button>
            </Link>
            <Button onClick={() => null}>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <hr className={`${styles.hr}`} />
    </>
  );
}

export default Header;
