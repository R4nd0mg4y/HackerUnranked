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
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [topicOptions, setTopicOptions] = useState("");
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
      setTopicOptions(
        Array.from(
          problems.reduce((set, problem) => {
            set.add(problem.topic);
            return set;
          }, new Set())
        ).map(topic=>({label:topic,value:topic}))
      );
     
    };
    fetchProblems();
  }, []);
  const handleTopicChange = (e)=>{
    const selectedValue = e.value;
    setSelectedTopic(selectedValue);
    if (selectedValue) {
      const filtered = problems.filter(
        (item) => item.topic === selectedValue && (selectedDifficulty ? item.difficulty === selectedDifficulty : true)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(problems);
    }
  }

  const handleDifficultyChange = (e) => {
    const selectedValue = e.value;
    console.log(selectedValue);

    setSelectedDifficulty(selectedValue);

    if (selectedValue) {
      const filtered = problems.filter(
        (item) => item.difficulty === selectedValue && (selectedTopic ? item.topic === selectedTopic : true)
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
        <Dropdown
          className="mb-2"
          value={selectedTopic}
          onChange={handleTopicChange}
          options={topicOptions}
          optionLabel="label"
          placeholder={"Topic"}
          editable
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
