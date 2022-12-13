import React, { useEffect, useRef } from "react";

import { GiCancel } from "react-icons/gi";
import { FiEdit } from "react-icons/fi";

import { MultiValue } from "react-select";
import Creatable from "react-select/creatable";

import { Col, FormLabel, Form, Row, Stack, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { FormNoteType, Tag, useContextState } from "../Context/StateContext";

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

  const handleSubmit = function (e: React.FormEvent) {
    e.preventDefault();
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
              <Form.Control
                defaultValue={Note?.title || ""}
                required
                ref={titleRef}
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
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "300px" }}
            ref={bodyRef}
            required
            defaultValue={Note?.body}
          />
        </Row>
        <Stack direction="horizontal" gap={3}>
          <Button type="submit" variant="success" className=" ms-auto">
            {!id ? "Create Note " : "Update Note "}
            <FiEdit />
          </Button>
          <div className="vr" />
          <Button
            onClick={() => {
              navigate("/");
            }}
            className="d-flex align-items-center justify-content-between"
            variant="outline-danger"
          >
            Cancel
            <GiCancel />
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NewNote;
