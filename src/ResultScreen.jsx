import React, { use } from "react";
import { useState, useEffect } from "react";
import { getProblemSubmissions } from "./getSubmission";

const ResultScreen = ({ result }) => {
  const [message, setMessage] = useState("");
  const [textColor, setTextColor] = useState("text-white-500");



  useEffect(() => {
    if (result === true) {
      setTextColor("text-green-500");
      setMessage("Correct Answer");
    } else if (result === false) {
      setTextColor("text-red-500");
      setMessage("Wrong Answer");
    } else {
      setTextColor("text-white-500");
      setMessage(result);
    }
    console.log(result)
  }, [result]);

 
  return (
    <>
      <p
        className={` ${textColor} w-full h-full items-start flex whitespace-pre-line`}
      >
        {message}
      </p>
     
    </>
  );
};

export default ResultScreen;
