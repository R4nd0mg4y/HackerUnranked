import Questions from "./Listofquesions";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProblems } from "./getProblem";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import LoginForm from "./Loginform";
import useCurrentUser from "./getUser";
import { getProblemSubmissions } from "./getSubmission";
const Home = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [topicOptions, setTopicOptions] = useState("");
  const [visible, setVisible] = useState(false);
  const { user } = useCurrentUser();
  // console.log(user)
  const difficultyOptions = [
    { label: "Easy", value: "Easy" },
    { label: "Medium", value: "Medium" },
    { label: "Hard", value: "Hard" },
  ];

  useEffect(() => {
    const fetchProblems = async () => {
    const allProblems = await getProblems();
    
  
      const problems = user 
        ? await Promise.all(
            allProblems.map(async (problem) => {
              const submissions = await getProblemSubmissions(user.uid, problem.id);
              return {
                ...problem,
                submissions,
              };
            })
          )
        : allProblems;
   
      setProblems(problems);
      setFilteredData(problems);
      setTopicOptions(
        Array.from(
          problems.reduce((set, problem) => {
            set.add(problem.topic);
            return set;
          }, new Set())
        ).map((topic) => ({ label: topic, value: topic }))
      );
    };

    fetchProblems();
  }, [user]);
  const handleTopicChange = (e) => {
    const selectedValue = e.value;
    setSelectedTopic(selectedValue);
    if (selectedValue) {
      const filtered = problems.filter(
        (item) =>
          item.topic === selectedValue &&
          (selectedDifficulty ? item.difficulty === selectedDifficulty : true)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(problems);
    }
  };
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // The useCurrentUser hook will automatically set user to null
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const handleDifficultyChange = (e) => {
    const selectedValue = e.value;
    console.log(selectedValue);

    setSelectedDifficulty(selectedValue);

    if (selectedValue) {
      const filtered = problems.filter(
        (item) =>
          item.difficulty === selectedValue &&
          (selectedTopic ? item.topic === selectedTopic : true)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(problems);
    }
  };

  return (
    <div className="bg-[#343a40]  w-[100vw] h-[100vh] px-30 relative">
      <div className="card ">
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

        <div className="top-0 absolute right-30 flex flex-row justify-center items-center space-x-5">
          {user ? <div>Welcome,{`${user?.email}`}</div> : null}
          {!user ? (
            <Button
              className="top-1  bg-blue-500"
              label="Login"
              // icon="pi pi-external-link"
              onClick={() => setVisible(true)}
            />
          ) : (
            <Button
              className="top-1  bg-blue-500"
              label="Logout"
              // icon="pi pi-external-link"
              onClick={handleLogout}
            />
          )}
        </div>
        <Dialog
          visible={visible}
          modal
          style={{ width: "50rem" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <div className="card flex flex-col justify-content-center items-center space-y-6 pt-5 mb-5">
            <LoginForm 
            setVisible={e=>setVisible(e)}/>
          </div>
        </Dialog>
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
