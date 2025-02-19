// import './problems.json';
const convertToStdin1 = (inputData) => {
  const numCases = parseInt(inputData[0][0]);
  let stdin = `${numCases}\n`;

  for (let i = 1; i < inputData.length; i++) {
    stdin += `${inputData[i].join("\n")}\n`;
  }

  return stdin;
};
const convertToStdin2 = (inputData) => {
  const numCases = inputData[0];  
  let stdin = `${numCases}\n`;  

  for (let i = 1; i < inputData.length; i++) {
    stdin += `${inputData[i]}\n`;  
  }

  return stdin;
}

//   const convertToStdout= (outputData) => {
//     let stdout ="";
//     for (let i = 0; i < outputData.length; i++) {
//       stdout += `${outputData[i]}\n`;
//     }
//     return stdout;
//   }
export const getProblem = async (id) => {
  try {
    const response = await fetch("/problems.json");
    const res = await fetch("/problemsChecking.json");
    const problems = await response.json();

    const problemsChecking = await res.json();

    const problem = problems.find((problem) => problem.id === id);
    if (!problem) {
      throw new Error(`Problem with ID ${id} not found`);
    }
    const problemChecking = problemsChecking.find(
      (problem) => problem.id === id
    );
    if (!problemChecking) {
      throw new Error(`Problem with ID ${id} not found`);
    }
    console.log(convertToStdin1(problemChecking.input))
    return {
      
      id: problem.id,
      title: problem.title,
      description: problem.description,
      output: problem.output,
      inputChecking: problemChecking.input,
      input: convertToStdin2(problem.input),
      realInput: convertToStdin1(problemChecking.input),
      realOutput: problemChecking.output,
    };
  } catch (error) {
    console.error("Error fetching problem:", error);
    return null;
  }
};
