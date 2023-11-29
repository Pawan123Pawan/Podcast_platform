import styles from "./CustomButton.module.css";

function CustomButton({value,onclick,disabled}) {
  return (
    <div onClick={onclick} className={styles.custom_button} disabled={disabled}>{value}</div>
  )
}

export default CustomButton