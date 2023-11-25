import React from "react";
import styles from "../InputComponent/InputComponent.module.css";
function InputComponent({type, value, hadleChange,placeholder}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={hadleChange}
      className={styles.custum_input}
    />
  );
}

export default InputComponent;
