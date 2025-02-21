import React, { useState, useEffect, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const Questions = ({ problems, onProblemSelect, overlayVisible }) => {
  const [selectedProblem, setSelectedProblem] = useState([]);
  // const [problemId, setProblemId] = useState(1);

  return (
    <DataTable
      value={problems}
      selectionMode="single"
      paginator={true}
      rows={10}
      selection={selectedProblem}
      onSelectionChange={(e) => {
        // console.log(e.value);
        onProblemSelect(e.value.id);
        setSelectedProblem(e.value);
      }}
      onRowClick={overlayVisible}
    >
      <Column
        header="Status"
        field="status"
        style={{ minWidth: "12rem" }}
        body={(rowData) => {
          const status = rowData.submissions?.latestSubmission.status;
          // console.log(String(status))
          const getStatusIcon = (status) => {
            switch (status) {
              case true:
                return <i className="pi pi-check text-green-500 text-xl" />; 
              case false:
                return <i className="pi pi-minus text-red-500 text-xl" />;
              case "Compile Error":
                  return <i className="pi pi-minus text-red-500 text-xl" />;
              default:
                return null; 
            }
          };
          return (
            <div className="flex justify-center items-center">
              {getStatusIcon(status)}
            </div>
          );
        }}
      />
      <Column header="Questions" field="title" style={{ minWidth: "12rem" }} />
      <Column
        header="Difficulty"
        field="difficulty"
        style={{ minWidth: "12rem" }}
        body={(rowData) => {
          const difficultyColors = {
            Easy: "text-green-500",
            Medium: "text-yellow-500",
            Hard: "text-white-red-500",
          };

          return (
            <span
              className={`px-2 py-1 rounded ${
                difficultyColors[rowData.difficulty] || "bg-gray-500 text-white"
              }`}
            >
              {rowData.difficulty}
            </span>
          );
        }}
      />
      <Column header="Topic" field="topic" style={{ minWidth: "12rem" }} />
      {/* <Column header="Image" body={imageBody} /> */}
      {/* <Column field="price" header="Price" sortable body={priceBody} style={{minWidth: '8rem'}} /> */}
    </DataTable>
  );
};
export default Questions;
