import {
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./firebase";

export const submitProblem = async (
  userId,
  problemId,
  code,
  language,
  status
) => {
  try {
    const userRef = doc(db, `Users/${userId}`);
    const submissionData = {
      status,
      code,
      language,
      timestamp: new Date(), 
    };

  
    await updateDoc(userRef, {
      [`problems.${problemId}.latestSubmission`]: submissionData, 
      [`problems.${problemId}.submissions`]: arrayUnion(submissionData), 
    });

    console.log("Bài nộp đã được lưu!");
  } catch (error) {
    console.error("Lỗi khi cập nhật bài tập: ", error);
  }
};