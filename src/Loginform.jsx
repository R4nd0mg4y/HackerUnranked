import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import { useState } from "react";
import { Button } from "primereact/button";
import RegisterForm from "./RegisterForm"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
const LoginForm = ({setVisible}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); 

  const toggleForm = () => {
    setIsRegistering(!isRegistering); 
  };
  const handleLogin = async()=>{
    setVisible(false);
    try{
        await signInWithEmailAndPassword(auth,email,password)
        console.log("login successfully")
    } catch(error){
        console.log(error.message)
    }
  }

  return (
    <>
      {isRegistering ? (
        <RegisterForm onClick={toggleForm}
        setVisible={e=>setVisible(e)}
        />
      ) : (
        <>
          <div className="card flex justify-content-center">
            <FloatLabel>
              <InputText
                id="username"
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
            <a className="text-purple-500 pr-40" onClick={toggleForm}>
              Register?
            </a>
          </div>
          <Button
            label="Login"
            onClick={handleLogin}
            className="w-[34%] bg-blue-500"
          />
        </>
      )}
    </>
  );
};

export default LoginForm;