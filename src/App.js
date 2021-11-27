import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Columns from "./components/Columns";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/columns" element={<Columns />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
