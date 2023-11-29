import { useState } from "react";
import styles from "../InputComponent/InputComponent.module.css";

function FileUpload({accept,id, filehandle, text}) {
    const[filSelected,setFileSelected] =useState("")
    function onChange(e){
        // console.log(e.target.files)
        setFileSelected(e.target.files[0].name); 
        filehandle(e.target.files[0])
    }
  return (
    <>
    
        <label htmlFor={id} className={`${styles.custum_input} ${ !filSelected &&styles.imput_placeholder}`}>{filSelected?`The file ${filSelected} was selected.`:text}</label>
        <input type="file" accept={accept} onChange={onChange} style={{display:"none"}} id={id}/>
    </>
  )
}

export default FileUpload