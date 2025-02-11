import Home from "./Home";
import CodeEditor from "./CodeEditor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/CodeEditor" element={<CodeEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
