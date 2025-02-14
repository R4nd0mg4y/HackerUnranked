import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import { useState } from "react";
import { Button } from "primereact/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth ,db } from "./firebase"; 
import {setDoc,doc} from "firebase/firestore"
import { signInWithEmailAndPassword } from "firebase/auth";
const Registerform = ({ onClick , setVisible}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegister = async() =>{
    setVisible(false);
    // e.preventDefault();
    try{
       await createUserWithEmailAndPassword(auth,email,password);
       const user = auth.currentUser;
    //    console.log(user)
       if(user){
        await setDoc(doc(db,"Users", user.uid),{
            email:user.email,
        })
       }
       await signInWithEmailAndPassword(auth,email,password);
    } catch(error){
        console.log(error.message)

    }
  }

  return (
    <>
      <div className="card flex justify-content-center">
        <FloatLabel>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </FloatLabel>
      </div>
      <div className="card flex justify-content-center">
        <FloatLabel>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
          />
          <label htmlFor="password">Password</label>
        </FloatLabel>
      </div>

      <div>
        <a className="text-purple-500 text-[15px] pr-50" onClick={onClick}>
          Login
        </a>
      </div>
      <Button
        label="Register"
        onClick={handleRegister}
        className="w-[34%] bg-blue-500"
      />
    </>
  );
};

export default Registerform;
