import { useState, useEffect } from "react";
import { getProblemSubmissions } from "./getSubmission";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import AceEditor from "react-ace";
// import { Button } from "primereact/button";
const Console = ({ result, problemId, uid }) => {
  // const [message, setMessage] = useState("");
  // const [textColor, setTextColor] = useState("text-white-500");
  const [submission, setSubmission] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [visible, setVisible] = useState(false);
  const langs = [
    { name: "Python", code: "python" },
    { name: "C++", code: "c_cpp" },
    { name: "Java", code: "java" },
    { name: "Javascript", code: "javascript" },
  ];
  const getLanguageCode = (languageName) => {
    const language = langs.find(
      (lang) => lang.name.toLowerCase() === languageName.toLowerCase()
    );
    return language ? language.code : null;
  };
  // useEffect(() => {
  //   if (result === true) {
  //     setTextColor("text-green-500");
  //     setMessage("Correct Answer");
  //   } else if (result === false) {
  //     setTextColor("text-red-500");
  //     setMessage("Wrong Answer");
  //   } else {
  //     setTextColor("text-white-500");
  //     setMessage(result);
  //   }
  // }, [result]);

  useEffect(() => {
    const getSubmision = async () => {
      const submission = await getProblemSubmissions(uid, problemId);
      setSubmission(submission.submissions);
    };
    getSubmision();
  }, [problemId]);

  return (
    <>
      {/* <p
        className={` ${textColor} w-full h-full items-start flex whitespace-pre-line`}
      >
        {message}
      </p> */}
      {!uid ? null : (
        <>
          <Dialog
            visible={visible}
            modal
            style={{ width: "50rem" }}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            {selectedSubmission && selectedSubmission.language && (
              <AceEditor
                className="mt-0"
                mode={getLanguageCode(selectedSubmission.language)}
                theme="monokai"
                name="code-editor"
                value={selectedSubmission.code}
                editorProps={{ $blockScrolling: true }}
                style={{ height: "calc(66vh - 100px)" }}
                width="100%"
                fontSize={15}
                readOnly={true}
                highlightActiveLine={false}
                showPrintMargin={false}
              />
            )}
          </Dialog>
          <DataTable
            value={submission}
            selectionMode="single"
            paginator={true}
            rows={4}
            selection={selectedSubmission}
            onSelectionChange={(e) => {
              // console.log(e.value);
              // onProblemSelect(e.value.id);

              setSelectedSubmission(e.value);
              // console.log(selectedSubmission);
              setVisible(true);
            }}
            // onRowClick={()=>setVisible(true)}
          >
            <Column
              // header="Status"
              field="status"
              style={{ minWidth: "30rem" }}
              body={(rowData) => {
                const StatusColors = {
                  true: "text-green-500",
                  "Compile Error": "text-yellow-500",
                  false: "text-red-500",
                };
                const status = rowData.status;
                const result = (status) => {
                  switch (status) {
                    case true:
                      return "Accept";
                    case false:
                      return "Wrong answer";
                    case "Compile Error":
                      return "Compile Error";
                    default:
                      return "";
                  }
                };

                return (
                  <div className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-500 p-2 rounded">
                    <span
                      className={`px-2 py-1 rounded ${
                        StatusColors[status] || "bg-gray-500 text-white"
                      }`}
                    >
                      {result(status)}
                    </span>
                    <i className="pi pi-eye text-gray-500" />{" "}
                    {/* Thêm icon xem */}
                  </div>
                );
              }}
            />
          </DataTable>
        </>
      )}
    </>
  );
};

export default Console;
