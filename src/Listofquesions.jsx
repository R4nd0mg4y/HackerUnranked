import React, { useState, useEffect, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const Questions = ({  onProblemSelect, overlayVisible }) => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState([]);
  // const [problemId, setProblemId] = useState(1);


  useEffect(() => {
    const fetchProblems = async () => {
      const response = await fetch("/problems.json");
      const data = await response.json();
      setProblems(data);
      // console.log(data);
    };
    fetchProblems();
  }, [problems]);

  return (
    <DataTable
      value={problems}
      selectionMode="single"
      paginator={true}
      rows={11}
      selection={selectedProblem}
      onSelectionChange={(e) => {
        // console.log(e.value);
        onProblemSelect(e.value.id);
        setSelectedProblem(e.value);
      }}
      onRowClick={overlayVisible}
    >
      <Column header="Questions" field="title" style={{ minWidth: "12rem" }} />
      {/* <Column header="Image" body={imageBody} /> */}
      {/* <Column field="price" header="Price" sortable body={priceBody} style={{minWidth: '8rem'}} /> */}
    </DataTable>
  );
};
export default Questions;
