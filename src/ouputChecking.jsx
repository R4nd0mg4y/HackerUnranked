const convertToStdin = (inputData) => {
  const numCases = inputData[0];  
  let stdin = `${numCases}\n`;  

  for (let i = 1; i < inputData.length; i++) {
    stdin += `${inputData[i]}\n`;  
  }

  return stdin;
}

export const outputChecking = (input, stdout, expectOutput) => {
  const stdoutArray = stdout.trim().split("\n");
  const expectOutputArray = expectOutput.trim().split("\n");

  if (stdoutArray.length !== expectOutputArray.length) {
    return {
        status: false,
        // len: stdoutArray.length,
        // ouput: stdoutArray[i],
        // expectOutput: expectOutputArray[i],
        // total: i,
        message: "Output length mismatch. Ensure you're handling all test cases correctly.",
        len: expectOutputArray.length
      };
  }

  for (let i = 0; i < stdoutArray.length; i++) {
    if (stdoutArray[i] !== expectOutputArray[i]) {
      return {
        currentInput: convertToStdin(input[i+1]),
        status: false,
        len: stdoutArray.length,
        output: stdoutArray[i],
        expectOutput: expectOutputArray[i],
        total: i,
      };
    }
  }
  return { status: true, len: stdoutArray.length };
};
