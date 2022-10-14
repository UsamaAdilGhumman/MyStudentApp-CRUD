import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import AddStudent from "./pages/addStudent";
import EditStudent from "./pages/editStudent";
import Home from "./pages/home";
import "./App.css";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
