// import './problems.json';
const convertToStdin = (inputData) => {
    const numCases = inputData[0];  
    let stdin = `${numCases}\n`;  
  
    for (let i = 1; i < inputData.length; i++) {
      stdin += `${inputData[i]}\n`;  
    }
  
    return stdin;
  }
  const convertToStdout= (outputData) => {
    let stdout ="";
    for (let i = 0; i < outputData.length; i++) {
      stdout += `${outputData[i]}\n`;  
    }
    return stdout;
  }  
  export const getProblem = async (id) => {
    try {
      const response = await fetch('/problems.json');
      const problems = await response.json();

      const problem = problems.find(problem => problem.id === id);
      if (!problem) {
        throw new Error(`Problem with ID ${id} not found`);
      }
  
      return {
        id: problem.id,
        title: problem.title,
        description: problem.description,
        output: (problem.output),
        input: convertToStdin(problem.input),
      };
    } catch (error) {
      console.error("Error fetching problem:", error);
      return null;
    }
  };
  