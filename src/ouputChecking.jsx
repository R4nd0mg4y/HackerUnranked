export const outputChecking = (stdout, expectOutput)=>{
    const stdoutArray = stdout.split('\n');
    const expectOutputArray = expectOutput.split('\n');
    if(stdoutArray.length !== expectOutputArray.length){
        // console.log(stdoutArray.length+" "+expectOutputArray.length);
        // console.log("wrong size "+stdoutArray+" "+expectOutputArray);
        return false;
    }
    for(let i=0; i<stdoutArray.length; i++){
        for(let j=0; j<stdoutArray[i].length; j++){
            if(stdoutArray[i][j] !== expectOutputArray[i][j]){
                // console.log("wrong comparation "+stdoutArray[i]+" "+expectOutputArray[i]);
                return false;
        }
        }
    }
    return true;
}