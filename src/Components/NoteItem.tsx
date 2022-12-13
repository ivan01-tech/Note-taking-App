import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useContextState } from "../Context/StateContext";

function NoteItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getNoteById, deleteNote } = useContextState()!;
  const Note = getNoteById(id);

  console.log(id);

  if (!id || !Note) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Row className="align-item-center my-4">
        <Col>
          <h2 className="text-truncate">{Note.title}</h2>

          {Note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {Note.tags.map((t) => (
                <Badge key={t.id} className="text-truncate">
                  {t.value}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                deleteNote(id);
                navigate("/");
              }}
              variant="outline-danger"
            >
              Delete
            </Button>

            <Button
              onClick={() => {
                navigate("/");
              }}
              variant="outline-secondary"
            >
              Back
            </Button>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{Note.body}</ReactMarkdown>,
    </>
  );
}

export default NoteItem;
