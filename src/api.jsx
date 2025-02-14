// https://github.com/MTrajK/coding-problems/blob/master/Arrays/find_el_where_k_greater_or_equal.py
import axios from "axios";
const runtime = axios.create({ baseURL: "https://emkc.org/api/v2/piston/runtimes" });
const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode ,stdin)  => {
    const runtimeResponse = await runtime.get();
    // console.log(runtimeResponse.data);
    const runtimeArray = runtimeResponse.data.map((data) => {
        return {
            language: data.language,
            version: data.version
        };
    });
    let version = null;
    runtimeArray.forEach((data) => {
        if (data.language === language) {
            version = data.version;
        }
    });
    const response = await API.post("/execute", {
        "language": language,
        "version": version,
        "files": [
          {
      
            "content": sourceCode
          }
        ],
         "stdin": stdin
    })
    return response.data;

}