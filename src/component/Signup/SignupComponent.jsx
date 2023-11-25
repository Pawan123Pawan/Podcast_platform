import { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import CustomButton from "../CustomButton/CustomButton";
import { auth, db, store } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { setUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

function SignupComponent() {
  const [fullname, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleButton() {
    console.log("dsjdlksd");
    if (password === confirmpassword && password.length > 6) {
      try {
        // creating an account user
        const userCredencial = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredencial.user;
        console.log(user);

        // adding user to firestore
        await setDoc(doc(db, "user", user.uid), {
          name: fullname,
          email: user.email,
          uid: user.uid,
        });

        // save data in the redux store
        dispatch(
          setUser({
            name: fullname,
            email: user.email,
            uid: user.uid,
          })
        );

        navigate("/profile");
      } catch (error) {
        console.log("error occured " + error);
      }
    } else {
      console.log("passwords dont match");
    }
  }

  return (
    <>
      <InputComponent
        type="text"
        value={fullname}
        hadleChange={(e) => setName(e.target.value)}
        placeholder={"Full Name"}
      />
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
      <InputComponent
        type="password"
        value={confirmpassword}
        hadleChange={(e) => setConfirmPassword(e.target.value)}
        placeholder={"Confirm Password"}
      />
      <CustomButton onclick={handleButton} value="Signup" />
    </>
  );
}

export default SignupComponent;
