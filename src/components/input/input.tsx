import styles from './input.module.css';
import {useState} from "react";
import EyeIco from "../eye-ico/eye-ico";
import EyeOffIco from "../eye-off-ico/eye-off-ico";
import {FormFieldI} from "../../models/form-field";

export default function Input({field,onChange,error,ready}:{field:FormFieldI,error: boolean, ready: boolean,onChange:(value:string) => void}){

    const type = field.type === 'password' ? "password" : "text"
    const [showPassword,setShowPassword] = useState<null | boolean>(type === 'password' ? false : null);
    return (
        <>
            <div className={`${styles.container} ${error ? styles.error : ''}`}>
                <span
                    className={styles.title}
                    children={field.title}
                />
                {type === 'text' && (
                    <input
                        disabled={ready}
                        placeholder={field.title === 'Email' ? 'megachad@trychad.com' : 'Mega Chad'}
                        type={'text'}
                        value={field.value}
                        className={styles.input}
                        onChange={({target}) => onChange(target.value)}
                    />
                )}
                {type === 'password' && (
                    <div className={styles.input}>
                        <input
                            disabled={ready}
                            placeholder={'Enter password'}
                            type={showPassword ? "text" : "password"}
                            className={styles.input}
                            value={field.value}
                            onChange={({target}) => onChange(target.value)}
                        />
                        <button
                            disabled={ready}
                            className={styles.checkbox}
                            children={showPassword ? <EyeOffIco/> : <EyeIco/>}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                )}
                {error && (
                    <span
                        className={styles.message}
                        children={'This field cannot be tempty'}
                    />
                )}
            </div>
        </>
    )
}