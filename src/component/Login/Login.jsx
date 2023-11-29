import { useDispatch } from "react-redux";
import CustomButton from "../CustomButton/CustomButton";
import { auth, db, store } from "../../firebase";
import InputComponent from "../InputComponent/InputComponent";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../slices/userSlice";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[loading,setLoading] = useState(false);
  async function handleButton() {
    // console.log("dsjdlksd");
    setLoading(true);
    if(email && password){
      try {
        // signin an account user
        const userCredencial = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredencial.user;
        const userDoc = await getDoc(doc(db, "user", user.uid));
        const userData = userDoc.data();
        // console.log( userData) ;
  
        // save data in the redux store
        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("user saved successfully")
        setLoading(false);
        navigate("/profile");
      } catch (error) {
        console.log("error occured " , error);
        toast.error(error.message);
        setLoading(false);
      }
    }
    else{
      toast.error("Please fill all the fields")
      setLoading(false);
    }
  }

  return (
    <>
      <InputComponent
        type="email"
        value={email}
        hadleChange={(e) => setEmail(e.target.value)}
        placeholder={"Email"}
      />
      <InputComponent
        type="password"
        value={password}
        hadleChange={(e) => setPassword(e.target.value)}
        placeholder={"Password"}
      />
      <CustomButton onclick={handleButton} value={loading?"Loading..":"Login"}  disabled={loading}/>
    </>
  );
}

export default Login;
