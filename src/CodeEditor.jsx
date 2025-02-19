import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { Button } from "primereact/button";
import { executeCode } from "./api";
import { Dropdown } from "primereact/dropdown";
import { getProblem } from "./problems";
import { outputChecking } from "./ouputChecking";
import Description from "./description";
import Console from "./console";
import { TabView, TabPanel } from "primereact/tabview";
import { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import Questions from "./Listofquesions";
import { BlockUI } from "primereact/blockui";
import { useLocation } from "react-router-dom";
import { getProblems } from "./getProblem";
import useCurrentUser from "./getUser";
import { submitProblem } from "./submitProblem";
import ResultScreen from "./ResultScreen";
import { getProblemSubmissions } from "./getSubmission";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";

import "ace-builds/src-noconflict/theme-monokai";

const CodeEditor = () => {
  const { user } = useCurrentUser();
  // console.log(user)
  const location = useLocation();
  const [code, setCode] = useState("");
  const [selectedLang, setselectedLang] = useState({
    name: "Python",
    code: "python",
  });
  const [problem, setProblem] = useState({});
  const langs = [
    { name: "Python", code: "python" },
    { name: "C++", code: "c_cpp" },
    { name: "Java", code: "java" },
    { name: "Javascript", code: "javascript" },
  ];
  // console.log(location.state);
  const [status, setStatus] = useState("");
  const [lastStatus, setLastStatus] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [problemId, setProblemId] = useState(location.state?.problemId || 1);
  const [blocked, setBlocked] = useState(false);
  const [problems, setProblems] = useState([]);
  const fetchProblems = async () => {
    const allProblems = await getProblems();
    const problems = user
      ? await Promise.all(
          allProblems.map(async (problem) => {
            const submissions = await getProblemSubmissions(
              user.uid,
              problem.id
            );
            return {
              ...problem,
              submissions,
            };
          })
        )
      : allProblems;

    setProblems(problems);
  };
  useEffect(() => {
    fetchProblems();
  });

  const op = useRef(null);

  useEffect(() => {
    const fetchProblem = async () => {
      const codingProblem = await getProblem(problemId);
      setProblem(codingProblem);
     
      if (user) {
        const submision = await getProblemSubmissions(user.uid, problemId);
        const status = submision.latestSubmission.status;
        console.log(status);
        setLastStatus(status);
      }
    };
    fetchProblem();
  }, [problemId,user,status]);

  const submit = async () => {
    setBlocked(true);
    executeCode(
      selectedLang.code === "c_cpp" ? "c++" : selectedLang.code,
      code,
      problem.realInput
    ).then((res) => {
      // console.log(problem.output);
      // console.log(res);
      if (res.run.stderr) {
        setStatus(res.run.stderr);
        // console.log(user.uid);
        if (user) {
          submitProblem(
            user?.uid,
            problemId,
            code,
            selectedLang.name,
            "Compile Error"
          );
        }
      } else {
        // console.log(user.email);
        // console.log(res.run.output);
        const result = outputChecking(problem.inputChecking,res.run.output, problem.realOutput);
        if (user) {
          submitProblem(user?.uid, problemId, code, selectedLang.name, result.status);
        }
        setStatus(result);
      }

      setActiveIndex(1);
      setBlocked(false);
      fetchProblems();
    });
  };

  return (
    <div className="bg-[#343a40] w-full h-full">
      <BlockUI blocked={blocked}>
        <div className="card align-items-center gap-3">
          <Button
            className="bg-blue-500"
            type="button"
            icon="pi pi-align-justify"
            label="List of questions"
            onClick={(e) => {
              op.current.toggle(e);
            }}
          />
          <OverlayPanel ref={op} showCloseIcon closeOnEscape dismissable={true}>
            <Questions
              problems={problems}
              onProblemSelect={(e) => {
                setProblemId(e);
                setActiveIndex(0);
                setStatus("");
                setCode("")
              }}
              overlayVisible={() => {
                op.current.hide();
              }}
            />
          </OverlayPanel>
        </div>
        <div className="justify-between w-[100vw] h-[100vh] flex-row-reverse items-center flex ">
          <div className="w-[49.8%] h-[100%] border-2 border-black p-2 rounded-lg">
            <div className="card flex justify-content-center w-[15%]">
              <Dropdown
                className="mb-2"
                value={selectedLang}
                onChange={(e) => setselectedLang(e.value)}
                options={langs}
                optionLabel="name"
                placeholder="Select a language"
              />
            </div>
            <AceEditor
              className="mt-0"
              mode={selectedLang?.code}
              theme="monokai"
              name="code-editor"
              onChange={(newCode) => setCode(newCode)}
              value={code}
              editorProps={{ $blockScrolling: true }}
              height="85%"
              width="100%"
              fontSize={15}
            />
            <div className="flex flex-row justify-between items-center w-full">
              <Button
                onClick={submit}
                label="Submit"
                // size="large"
                className="bg-blue-400 mt-2"
              />
            </div>
          </div>

          <div className="w-[49.8%] h-[100vh] border-2 border-black p-5 rounded-lg">
            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            >
              <TabPanel header="Question">
                <div className="h-[80vh] w-full">
                  <Description
                    title={problem.title}
                    description={problem.description}
                    status={lastStatus}
                    input={problem.input}
                    output={problem.output}
                  />
                </div>
              </TabPanel>
              <TabPanel header="Submission">
                <div className="h-[80vh] w-full flex flex-col items-start justify-start">
                  <ResultScreen result={status} />
                </div>
              </TabPanel>
              <TabPanel header="History">
                <div className="h-[80vh] w-full flex flex-col items-center ">
                  <Console
                    problemId={problemId}
                    uid={user?.uid}
                  />
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </BlockUI>
    </div>
  );
};

export default CodeEditor;
