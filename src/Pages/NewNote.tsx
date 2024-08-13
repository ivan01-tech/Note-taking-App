import { FormNoteType, useContextState } from "../Context/StateContext";
import FormNote from "../Components/FormNote";

type NewNoteType = {
  onSubmit: (data: FormNoteType) => void;
};

function NewNote() {
  const { onSubmit, TagsV } = useContextState()!;

  return (
    <>
      <h1 className="m-4">New Note</h1>
      <FormNote TagsV={TagsV} onSubmit={onSubmit} />
    </>
  );
}

export default NewNote;
