import Questions from "./Listofquesions";
// import CodeEditor from "./CodeEditor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Home = () => {
  const navigate = useNavigate();
//   const [problemId, setProblemId] = useState();
  return (
    <div className="bg-[#343a40]  w-[100vw] h-[100vh] px-30">
      <div className="card">
        <Questions
          onProblemSelect={(e) => {
            // setProblemId(e);
            navigate("/CodeEditor", { state: { problemId: e } });
            console.log(e);
          }}
        />
      </div>
    </div>
  );
};
export default Home;
