import React, { useEffect, useRef } from "react";
import { GiCancel } from "react-icons/gi";
import { FiEdit } from "react-icons/fi";
import { MultiValue } from "react-select";
import Creatable from "react-select/creatable";
import { Col, FormLabel, Form, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormNoteType, Tag, useContextState } from "../Context/StateContext";
import Button from "./Button";
import styles from "../Note.module.css";
import Input, { TextArea } from "./Input";

export type FormNoteProps = {
  onSubmit: (data: FormNoteType, id?: string) => void;
  TagsV: Tag[];
  id?: string;
};

function NewNote({ onSubmit, id }: FormNoteProps) {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const { TagsV, setSelectedtag, getNoteById } = useContextState()!;
  const Note = getNoteById(id);

  // Selected as a default value of note tag
  useEffect(() => {
    if (Note)
      setSelectedtag(
        Note?.tags.map((p) => ({
          label: p.value,
          value: p.id,
        })) || []
      );
  }, []);
  // submit handler to create or update note
  const handleSubmit = function (e: React.FormEvent) {
    e.preventDefault();
    console.log(titleRef, bodyRef);
    if (id) {
      onSubmit(
        {
          title: titleRef.current!.value,
          body: bodyRef.current!.value,
        },
        id
      );
    } else {
      onSubmit({
        title: titleRef.current!.value,
        body: bodyRef.current!.value,
      });
    }

    if (titleRef?.current) titleRef.current.value = "";
    if (bodyRef?.current) bodyRef.current.value = "";
    navigate("/", { replace: true });
  };

  const handleSelectedChange = function (
    newValue: MultiValue<{
      value: string;
      label: string;
      __isNew__?: boolean;
    }>
  ) {
    console.log("newValue====================");
    console.log(newValue);

    setSelectedtag(newValue);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group>
              <FormLabel>Title : </FormLabel>
              <Input
                className={`${styles.input}`}
                defaultValue={Note?.title || ""}
                required
                titleRef={titleRef}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <FormLabel>Tags : </FormLabel>
              <Creatable
                onChange={handleSelectedChange}
                isMulti
                defaultValue={Note?.tags.map((p) => ({
                  label: p.value,
                  value: p.id,
                }))}
                options={TagsV.map((p) => ({
                  label: p.value,
                  value: p.id,
                }))}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Label>Body</Form.Label>
          <TextArea
            placeholder="Leave a comment here"
            style={{ height: "250px" }}
            bodyRef={bodyRef}
            required
            defaultValue={Note?.body}
            className={`${styles.textArea}`}
          />
        </Row>
        <Stack direction="horizontal" gap={3}>
          <Button type="submit" onClick={handleSubmit}>
            <span>{!id ? "Create Note " : "Update Note "}</span>
            <FiEdit />
          </Button>
          <div className="vr" />
          <Button
            onClick={() => {
              navigate("/");
            }}
            color="red"
          >
            <span>Cancel</span>
            <GiCancel />
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NewNote;
