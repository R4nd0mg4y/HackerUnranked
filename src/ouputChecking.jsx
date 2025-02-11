export const outputChecking = (stdout, expectOutput) => {
    const stdoutArray = stdout.trim().split('\n');
    const expectOutputArray = expectOutput.trim().split('\n');
    

    if (stdoutArray.length !== expectOutputArray.length) {
        return false;
    }

 
    for (let i = 0; i < stdoutArray.length; i++) {
        if (stdoutArray[i] !== expectOutputArray[i]) {
            return false;  
        }
    }
    return true;  
}
