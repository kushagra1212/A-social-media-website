import Styles from "./Input.module.css"
const Input =({placeholder,onChange,value,type,onKeyDown=null})=>{
  return (
        <div class={Styles.form__group}>
        <input type={type} class={Styles.form__field} placeholder={placeholder} value={value} onChange={onChange} name="name"  required onKeyDown={onKeyDown} />
        <label for="name" class={Styles.form__label}>{placeholder}</label>
      </div>
  )
}

export default Input;