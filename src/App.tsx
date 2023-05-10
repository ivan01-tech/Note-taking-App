import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NoteItem from "./Components/NoteItem";
import EditNote from "./Pages/EditNote";
import Home from "./Pages/Home";
import NewNote from "./Pages/NewNote";
import NoteItemLayout from "./Pages/NoteItemLayout";
import Layout from "./Components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="notes/new" element={<NewNote />} />

        <Route path="notes/:id" element={<NoteItemLayout />}>
          <Route index element={<NoteItem />} />
          <Route path="edit" element={<EditNote />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
