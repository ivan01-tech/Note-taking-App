import { Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "./Button";
import { FiEdit } from "react-icons/fi";
import styles from "../Note.module.css";
import { useModal } from "../Hooks/useModal";
type Props = {};

function Header({}: Props) {
  const { toogleModal } = useModal()!;

  return (
    <>
      <Row className="align-item-center  header">
        <Col className="d-flex flex-column align-items-start ">
          <h1 className={`mb-0 ${styles.title}`}>NoteTakingApp</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/notes/new">
              <Button color="green">
                <span>Create</span>
                <FiEdit />
              </Button>
            </Link>
            <Button
              onClick={() => {
                console.log("called!");
                toogleModal(true);
              }}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <hr className={`${styles.hr}`} />
    </>
  );
}

export default Header;
