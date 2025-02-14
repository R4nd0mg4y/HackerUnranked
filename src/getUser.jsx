import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Custom hook to get current user
function useCurrentUser() {
  const [user, setUser] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
   
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        const userData = userDoc.data();

 
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,

          ...userData, 
        });
      } else {
        setUser(null);
      }
    });
  },[auth, db]);

  return { user };
}

export default useCurrentUser;
