
import Header from "../component/Header/Header"
import styles from "./Signup.module.css";
import SignupComponent from "../component/Signup/SignupComponent";
import { useState } from "react";
import Login from "../component/Login/Login";

function SignUp() {
  const[flag,setFlag] =useState(true)
  
  return (
  <>
      <Header/>
      <div className={styles.wraper_signup_page}>
        {flag ?<h1 className={styles.signup_heading}>SignUp</h1>:<h1 className={styles.signup_heading}>Login</h1>}
        {flag ? <SignupComponent/>:<Login/>}
        {
          flag ? <p>If you have already an Acount. <span onClick={()=>setFlag(!flag)} className={styles.login_para}>Login</span></p> : <p>Create an acount. <span onClick={()=>setFlag(!flag)} className={styles.signup_para}>Signup</span></p>
        }
      </div>
    </>
  )
}

export default SignUp;