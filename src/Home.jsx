import Questions from "./Listofquesions";
// import CodeEditor from "./CodeEditor";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProblems } from "./getProblem";
import { Dropdown } from "primereact/dropdown";
const Home = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const difficultyOptions = [
    { label: "Easy", value: "Easy" },
    { label: "Medium", value: "Medium" },
    { label: "Hard", value: "Hard" },
  ];
  useEffect(() => {
    const fetchProblems = async () => {
      const problems = await getProblems();
      setProblems(problems);
      setFilteredData(problems);
    };
    fetchProblems();
  }, []);

  const handleDifficultyChange = (e) => {
    const selectedValue = e.value;
    console.log(selectedValue);

    setSelectedDifficulty(selectedValue);

    if (selectedValue) {
      const filtered = problems.filter(
        (item) => item.difficulty === selectedValue
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(problems);
    }
  };

  return (
    <div className="bg-[#343a40]  w-[100vw] h-[100vh] px-30">
      <div className="card flex-1">
        <Dropdown
          className="mb-2"
          value={selectedDifficulty}
          onChange={handleDifficultyChange}
          options={difficultyOptions}
          optionLabel="label"
          placeholder={"Difficulty"}
          showClear
          checkmark={true}
        />
        <Questions
          problems={filteredData}
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
