import { useMemo, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormLabel,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";

import { FiEdit, FiSearch } from "react-icons/fi";

import { Link } from "react-router-dom";
import Select from "react-select";
import ListNotes from "../Components/ListNotes";
import { Tag, useContextState } from "../Context/StateContext";
import ModalComp from "../Components/Modal";

function Home() {
  const refModal = useRef<HTMLDivElement>(null);

  const [toogle, setToogleModal] = useState(false);
  const { Notes, TagsV } = useContextState()!;

  const [selecteTags, setSelecteTags] = useState<Tag[]>([]);
  const [Title, setTitle] = useState("");

  const filteredNote = useMemo(() => {
    return Notes.filter((note) => {
      return (
        (Title == "" ||
          note.title.toLowerCase().includes(Title.toLowerCase())) &&
        (selecteTags.length == 0 ||
          selecteTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.value === tag.value)
          ))
      );
    });
  }, [Title, Notes, selecteTags]);

  const handleToogle = function () {
    setToogleModal((prev) => !prev);
  };

  console.log("filter = ", filteredNote);
  console.log("Selected = ", selecteTags);
  return (
    <>
      <ModalComp toogle={toogle} setToogle={handleToogle} ref={refModal} />

      <Row className="align-item-center my-4 header">
        <Col className="d-flex flex-column align-items-start ">
          <h1 className="mb-0">NTA</h1>
          <span className="text-small mbt-0">Note Taking App</span>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button
                variant="primary"
                className="d-flex align-items-center justify-content-between"
              >
                Create <FiEdit />
              </Button>
            </Link>
            <Button onClick={handleToogle} variant="outline-secondary">
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  value={Title}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <FormLabel>Tags : </FormLabel>
                <Select
                  isMulti
                  onChange={(newvalue) => {
                    const tagTitle = newvalue.map((t) => t.value);
                    console.log(tagTitle);
                    setSelecteTags(
                      TagsV.filter((tag) => tagTitle.some((a) => a === tag.id))
                    );
                  }}
                  options={TagsV.map((p) => ({ label: p.value, value: p.id }))}
                />
              </Form.Group>
            </Col>
            {/* <Col xs="auto">
              <FiSearch />
            </Col> */}
          </Row>
        </Form>
      </Row>

      <ListNotes NotesList={filteredNote} />
    </>
  );
}

export default Home;
