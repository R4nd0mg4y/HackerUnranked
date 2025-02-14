// import React from "react";
const Description = ({ title, description, status, input, output }) => {
  return (
    <div>
      <div className="flex flex-col justify-evenly h-full w-full">
        <h3
          className={`font-bold text-3xl mb-5 ${
            status ? "text-green-500" : "text-white"
          }`}
        >
          {title}
          {" "}
          {status ? <i className="pi pi-check text-green-500 text-xl" /> : ""}
        </h3>
        <p className="text-1xl">{description}</p>
      </div>
      <div className="w-full h-full items-start flex flex-col mt-8">
        <div className="mb-2">Example</div>
        <div className="flex flex-row justify-center text-1xl w-full h-full">
          <div className="whitespace-pre-line border-black border-2 h-80 w-full flex-1 pl-2">
            {"Input\n"}
            {input}
          </div>
          <div className="whitespace-pre-line border-black border-2 h-80 w-full flex-1 pl-2">
            {"Output\n"}
            {output}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
