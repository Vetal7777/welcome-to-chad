import styles from './logo.module.css'
import LogoIco from "../logo-ico/logo-ico";

export default function Logo(){
    return (
        <>
            <div className={styles.container}>
                <LogoIco/>
                Chad
            </div>
        </>
    )
}