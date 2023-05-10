import { Col, Row } from "react-bootstrap";
import { NoteType } from "../Context/StateContext";
import SimplifiedNoteItem from "./SimplifiedNoteItem";

import styles from "../Note.module.css";

type NoteListProps = {
  NotesList: NoteType[];
};

function ListNotes({ NotesList }: NoteListProps) {
  if (NotesList.length <= 0)
    return (
      <div className={`${styles.emptyNotes}`}>
        <img
          width={"300px"}
          height={"300px"}
          src="/emptyState.svg"
          alt="Notes empty"
        />
        <p>Click the button to add a new Note</p>
      </div>
    );
  return (
    <>
      <Row className="mt-4 text-center">
        <h2>
          {NotesList.length > 0 && (
            <span className="note-count bg-primary">{NotesList.length}</span>
          )}{" "}
          List of Notes
        </h2>
      </Row>
      <Row className="g-3 mt-1" gap={2} xs={"1"} sm="2" lg="3" xl="4">
        {NotesList.map((note) => (
          <Col key={note.id}>
            <SimplifiedNoteItem
              tags={note.tags}
              id={note.id}
              title={note.title}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default ListNotes;
