import styles from './connect-item.module.css';
import {ConnectItemI} from "../../models/connect-item";
import CheckGreenIco from "../check-green-ico/check-green-ico";

export default function ConnectItem({item}:{item:ConnectItemI}){
    return (
        <>
            <div className={styles.container}>
                <CheckGreenIco/>
                <div className={styles.content}>
                    <span
                        className={styles.title}
                        children={item.title}
                    />
                    <p
                        children={item.message}
                        className={styles.message}
                    />
                </div>
            </div>
        </>
    )
}