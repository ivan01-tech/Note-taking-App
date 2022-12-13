import { FormNoteType, useContextState } from "../Context/StateContext";
import FormNote from "../Components/FormNote";

type NewNoteType = {
  onSubmit: (data: FormNoteType) => void;
};

function NewNote() {
  const { onSubmit, TagsV } = useContextState()!;

  return (
    <>
      <h2 className="m-4">New Note</h2>
      <FormNote TagsV={TagsV} onSubmit={onSubmit} />
    </>
  );
}

export default NewNote;
