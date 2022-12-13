import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NoteItem from "./Components/NoteItem";
import EditNote from "./Pages/EditNote";
import Home from "./Pages/Home";
import NewNote from "./Pages/NewNote";
import NoteItemLayout from "./Pages/NoteItemLayout";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewNote />} />

        <Route path="/:id" element={<NoteItemLayout />}>
          <Route index element={<NoteItem />} />
          <Route path="edit" element={<EditNote />} />
        </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  );
}

export default App;
