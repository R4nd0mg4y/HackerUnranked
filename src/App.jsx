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
// Import các theme và mode (ngôn ngữ) bạn cần
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";

import "ace-builds/src-noconflict/theme-monokai";

const CodeEditor = () => {
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
  const [status, setStatus] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [problemId, setProblemId] = useState(1);
  //  console.log(problem.input);
  const op = useRef(null);
  // Hàm submit code của bạn
  useEffect(() => {
    const fetchProblem = async () => {
      const codingProblem = await getProblem(problemId);
      // console.log(codingProblem.input);
    
      setProblem(codingProblem);
    };
    fetchProblem();
  }, [problemId]);
  const submit = async () => {
    // Gọi hàm executeCode với ngôn ngữ và code của bạn
    executeCode(
      selectedLang.code === "c_cpp" ? "c++" : selectedLang.code,
      code,
      problem.input
    ).then((res) => {
      // console.log(problem.output);
      // console.log(res.run.stderr);
      if (res.run.stderr) {
        setStatus(res.run.stderr);
      } else {
        console.log(res.run.output);
        setStatus(outputChecking(res.run.output, problem.output));
      }
      console.log(status);
      setActiveIndex(1);
    });
  };

  return (
    <div>
      <div className="card align-items-center gap-3">
        <Button
          className="bg-blue-500"
          type="button"
          icon="pi pi-search"
          label="List of questions"
          onClick={(e) => op.current.toggle(e)}
        />
        <OverlayPanel ref={op} showCloseIcon closeOnEscape dismissable={false}>
          <Questions onProblemSelect={(e) => setProblemId(e)} />
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

        <div className="w-[49.8%] h-full border-2 border-black p-5 rounded-lg">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="Question">
              <div className="h-[80vh] w-full">
                <Description
                  title={problem.title}
                  description={problem.description}
                  status="complete"
                  input={problem.input}
                  output={problem.output}
                />
              </div>
            </TabPanel>
            <TabPanel header="Submission">
              <div className="h-full w-full flex flex-col items-center  border-black p-5 rounded-lg">
                <Console result={status} />
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
