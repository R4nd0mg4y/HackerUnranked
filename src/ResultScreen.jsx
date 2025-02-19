import React, { use } from "react";
import { useState, useEffect } from "react";
import { getProblemSubmissions } from "./getSubmission";

const ResultScreen = ({ result }) => {
  const [message, setMessage] = useState("");
  const [textColor, setTextColor] = useState("text-white-500");
  // const [screen,setScreen] = useState();

  useEffect(() => {
    if (result && typeof result === "object") {
      if (result.status === true) {
        setTextColor("text-green-500");
        setMessage("Correct Answer");
      } else if (result.status === false) {
        setTextColor("text-red-500");
        setMessage("Wrong Answer");
      }
    } else if (result) {
      setTextColor("text-red-500");
      setMessage("Complie Error");
    }
    // console.log(result)
    console.log(result);
  }, [result]);

  let screen;
  if (result.status === true) {
    // setTextColor("text-green-500");
    // setMessage("Correct Answer");
    screen = (
      <div className="flex flex-col justify-center items-start rounded-2xl bg-[#343a40]/30 text-white p-3 w-full space-y-8">
        <div className="flex flex-row justify-between items-center w-full">
          <p
            className={` ${textColor} flex whitespace-pre-line font-bold text-2xl`}
          >
            {message}
          </p>
          <div>
            Passed test case: {result.len} / {result.len}
          </div>
        </div>
        <div>You have successfully completed this problem!</div>
      </div>
    );
  } else if (result.status === false) {
    if (!result.message) {
      screen = (
        <div className="flex flex-col justify-center items-start rounded-2xl bg-[#343a40]/30 text-white p-3 w-full space-y-3">
          <div className="flex flex-row justify-between items-center w-full">
            <p
              className={` ${textColor} flex whitespace-pre-line font-bold text-2xl`}
            >
              {message}
            </p>
            <div>
              Passed test case: {result.total} / {result.len}
            </div>
          </div>
          <div>Last executed test case:</div>
          <div>Input:</div>
          <div className=" bg-[#343a40]/80 w-full p-2 whitespace-pre-line">
            {result.currentInput}
          </div>
          <div>Your output:</div>
          <div className=" bg-[#343a40]/80 w-full p-2">{result.output}</div>
          <div>Expected Output</div>
          <div className=" bg-[#343a40]/80 w-full p-2">
            {result.expectOutput}
          </div>
        </div>
      );
    } else {
      screen = 
        (
          <div className="flex flex-col justify-center items-start rounded-2xl bg-[#343a40]/30 text-white p-3 w-full space-y-8">
            <div className="flex flex-row justify-between items-center w-full">
              <p
                className={` ${textColor} flex whitespace-pre-line font-bold text-2xl`}
              >
                {message}
              </p>
              <div>Passed test case: 0 / {result.len}</div>
            </div>
            <div>{result.message}</div>
          </div>
        );
    }
  }

  return (
    <>
      {typeof result !== "object" ? (
        <div className="flex flex-col justify-center items-start space-y-4">
          <p
            className={` ${textColor} w-full h-full items-start flex whitespace-pre-line font-bold justify-start text-2xl`}
          >
            {message}
          </p>
          {result ? (
            <div className="rounded-2xl bg-red-500/30 text-red-100 p-3">
              {result}
            </div>
          ) : null}
        </div>
      ) : (
        screen
      )}
    </>
  );
};

export default ResultScreen;
