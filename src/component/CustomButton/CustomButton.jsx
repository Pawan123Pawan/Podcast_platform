import styles from "./CustomButton.module.css";

function CustomButton({value,onclick}) {
  return (
    <div onClick={onclick} className={styles.custom_button}>{value}</div>
  )
}

export default CustomButton