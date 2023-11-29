import { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import CustomButton from "../CustomButton/CustomButton";
import { auth, db, store } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { setUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignupComponent() {
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleButton() {
    console.log("dsjdlksd");
    setLoading(true);
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
        toast.success("User saved successfully")
        setLoading(false);
        navigate("/profile");
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      if(password !== confirmpassword){
        toast.error("Password did not match. Please try again")
      }
      else if(password.length<6){
        toast.error("Password must be at least 6 characters long. Please try again")
      }
      setLoading(false);
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
      <CustomButton onclick={handleButton} disabled ={loading} value={loading?"Loading..":"Signup"} />
    </>
  );
}

export default SignupComponent;
