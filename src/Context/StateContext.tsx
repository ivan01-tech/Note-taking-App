import React, { createContext, useContext, useState } from "react";
import { MultiValue } from "react-select";
import { v1, v4 as uuid } from "uuid";
import useLocalStorage from "../Hooks/useLocalStorage";

// TYPES
export type FormNoteType = {
  title: string;
  body: string;
};

export type NoteType = {
  tags: Tag[];
  id: string;
} & FormNoteType;

export type Tag = {
  value: string;
  id: string;
};

// context type
type ContextPropsProvider = {
  children: React.ReactNode;
};

type ContextTypes = {
  Notes: NoteType[];
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  TagsV: Tag[];
  setTagsV: React.Dispatch<React.SetStateAction<Tag[]>>;
  onSubmit: (data: FormNoteType) => void;
  Selectedtag: MultiValue<{
    value: string;
    label: string;
    __isNew__?: boolean;
  }>;
  getNoteById: (id: string | undefined) => NoteType | undefined;
  deleteNote: (id: string) => void;
  onEditNote: (data: FormNoteType, id?: string) => void;
  setSelectedtag: React.Dispatch<
    React.SetStateAction<
      MultiValue<{
        value: string;
        label: string;
        __isNew__?: boolean;
      }>
    >
  >;
};

// context // useContext hook
const StateContext = createContext<ContextTypes | null>(null);

export const useContextState = function () {
  return useContext(StateContext);
};

function StateContextProvider({ children }: ContextPropsProvider) {
  // global state of our application( notes state and tags state)
  const { State: Notes, setState: setNotes } = useLocalStorage<NoteType[]>(
    "Notes",
    []
  );
  const { State: TagsV, setState: setTagsV } = useLocalStorage<Tag[]>(
    "Tags",
    []
  );

  const [Selectedtag, setSelectedtag] = useState<
    MultiValue<{
      value: string;
      label: string;
      __isNew__?: boolean;
    }>
  >([]);

  // functions
  const onSubmit = function (data: FormNoteType) {
    console.log("SELE", Selectedtag);
    const tags = Selectedtag.filter((t) => Boolean(t.__isNew__)).map((t) => ({
      value: t.value,
      id: v1(),
    }));
    const oldTags = Selectedtag.filter((t) => !Boolean(t.__isNew__)).map(
      (t) => ({
        value: t.label,
        id: t.value,
      })
    );

    const temp = { ...data, tags: [...tags, ...oldTags], id: uuid() };
    console.log("TEMP", temp);
    console.log("TAGS", tags);
    setNotes((prev) => [...prev, temp]);
    setTagsV((prev) => [...prev, ...tags]);
    console.log("NOTES", Notes);

    setSelectedtag([]);
  };

  const onEditNote = function (data: FormNoteType, id?: string) {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id == id) {
          return {
            ...note,
            ...data,
            tags: Selectedtag.map((t) => ({
              value: t.label,
              id: t.value,
            })),
          };
        }

        return note;
      })
    );
  };

  const getNoteById = (id: string | undefined) => {
    if (!id) return;
    return Notes.find((note) => note.id == id);
  };
  // to easily swipe between an array of Tag to an Array of Select type
  const changeFromTagTypeToSelectType = (notes: Tag[]) =>
    notes.map((p) => ({
      label: p.value,
      value: p.id,
    }));

  const deleteNote = function (id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const value = {
    onEditNote,
    deleteNote,
    getNoteById,
    Notes,
    setNotes,
    TagsV,
    setTagsV,
    onSubmit,
    Selectedtag,
    setSelectedtag,
  };
  console.log("===Notes===", Notes);
  console.log("===Tags===", TagsV);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}

export default StateContextProvider;
