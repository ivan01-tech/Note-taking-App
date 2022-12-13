import { FormNoteType, useContextState } from "../Context/StateContext";
import FormNote from "../Components/FormNote";
import { useParams } from "react-router-dom";

type EditNoteType = {
  onSubmit: (data: FormNoteType) => void;
};

function EditNote() {
  const { onEditNote, TagsV } = useContextState()!;
  const { id } = useParams();

  return (
    <>
      <h2 className="m-4">Edit Note</h2>
      <FormNote id={id} TagsV={TagsV} onSubmit={onEditNote} />
    </>
  );
}

export default EditNote;
