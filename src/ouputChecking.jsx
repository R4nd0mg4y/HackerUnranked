export const outputChecking = (stdout, expectOutput) => {
    const stdoutArray = stdout.trim().split('\n');
    const expectOutputArray = expectOutput.trim().split('\n');
    
    // Check if the number of lines are the same
    if (stdoutArray.length !== expectOutputArray.length) {
        return false;
    }

    // Compare each line in the output with the expected output
    for (let i = 0; i < stdoutArray.length; i++) {
        if (stdoutArray[i] !== expectOutputArray[i]) {
            return false;  // Return false as soon as a mismatch is found
        }
    }
    return true;  // Return true if all lines match
}
