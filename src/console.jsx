import React from "react";

const Console = ({ result }) => {
  let message;

  if (result === true) {
    message = "Accept";
  } else if (result === false) {
    message = "Wrong Answer";
  } else {
    message = result; 
  }

  return <p className="w-full h-full items-start flex whitespace-pre-line">{message}</p>;
};

export default Console;
