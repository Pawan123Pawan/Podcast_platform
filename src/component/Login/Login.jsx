import { useDispatch } from "react-redux";
import CustomButton from "../CustomButton/CustomButton";
import { auth, db, store } from "../../firebase";
import InputComponent from "../InputComponent/InputComponent";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../slices/userSlice";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleButton() {
    // console.log("dsjdlksd");
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

      navigate("/profile");
    } catch (error) {
      console.log("error occured " + error);
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
      <CustomButton onclick={handleButton} value="Login" />
    </>
  );
}

export default Login;
