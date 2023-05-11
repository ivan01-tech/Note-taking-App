import React, { useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { createPortal } from "react-dom";
import { useContextState } from "../Context/StateContext";
import styles from "../Modal.module.css";
import { useModal } from "../Hooks/useModal";

type PropsType = {};

const ModalComp = React.forwardRef<HTMLDivElement, PropsType>(({}, ref) => {
  // const ModalComp = ({}: PropsType) => {
  const { toogleModal, showModals } = useModal()!;
  const [Error, setError] = useState("");
  const { TagsV, setTagsV, setNotes, Notes } = useContextState()!;

  const refInputs = useRef<HTMLInputElement[]>([]);

  const addRef = function (elt: HTMLInputElement) {
    if (!refInputs.current.includes(elt)) {
      refInputs.current.push(elt);
      return;
    }
  };

  // to edit a tag
  const handleSaveChanges = function () {
    const correctInp = refInputs.current.filter((input) => Boolean(input));

    correctInp.forEach((inp) => {
      if (!Boolean(inp.value)) {
        setError("Invalid value");
        return;
      }

      const dataID = inp?.parentElement?.parentElement?.dataset.itemid;
      console.log("====", dataID);

      setTagsV((prev) =>
        prev.map((a, ind) => {
          // console.log("==a==", a);
          if (a.id === dataID) {
            a.value = inp.value;
            console.log(ind, "=a=", a);
          }
          return a;
        })
      );

      setNotes((prev) =>
        prev.map((note) => {
          return {
            ...note,
            tags: note.tags.map((tag) => {
              return {
                ...tag,
                value:
                  correctInp.find(
                    (inp) =>
                      inp.parentElement?.parentElement?.dataset.itemid == tag.id
                  )?.value || "",
              };
            }),
          };
        })
      );
    });
    // hid againg the modal
    toogleModal();
  };
  // to delete a tag( once we delete a tag we also make sur that we update de Notes)
  const handleDelete = function (id: string) {
    setNotes((prev) =>
      prev.map((note) => {
        return {
          ...note,
          tags: note.tags.filter((tag) => tag.id !== id),
        };
      })
    );

    setTagsV((prev) => prev.filter((a) => a.id !== id));
  };

  return createPortal(
    <div
      ref={ref}
      className={`${styles.modal} ${showModals ? styles.show : ""}`}
    >
      <div>
        <Modal.Dialog>
          <Modal.Header onClick={() => toogleModal(false)} closeButton>
            <Modal.Title>
              <h3>Edit Tags</h3>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form className="px-4">
              {TagsV.length > 0 &&
                TagsV.map((tag) => (
                  <Row key={tag.id} data-itemid={tag.id} className="my-2">
                    <Col>
                      <Form.Control
                        defaultValue={tag.value}
                        type="text"
                        ref={addRef}
                        required
                      />
                    </Col>
                    <Col xs="auto">
                      <Button
                        onClick={(e) => handleDelete(tag.id)}
                        variant="outline-danger"
                      >
                        &times;
                      </Button>
                    </Col>
                  </Row>
                ))}
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" onClick={handleSaveChanges} variant="primary">
              Save changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>,
    document.body
  );
});

export default ModalComp;
