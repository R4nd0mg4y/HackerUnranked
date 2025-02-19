
export const getProblems = async () => {
      const response = await fetch("/problems.json");
      const data = await response.json();
      return data;
}

export const getProblemsChecking = async () => {
      const response = await fetch("/problemsChecking.json");
      const data = await response.json();
      return data;
}