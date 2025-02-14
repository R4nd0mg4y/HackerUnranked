import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
export const getProblemSubmissions = async (userId, problemId) => {
  try {
    const userRef = doc(db, `Users/${userId}`);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const problems = userDoc.data().problems;
      if (problems && problems[problemId]) {
        return problems[problemId];
      }
    }
    return null;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu bài nộp: ", error);
    return null;
  }
};