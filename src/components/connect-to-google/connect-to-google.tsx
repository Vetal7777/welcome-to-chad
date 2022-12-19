import styles from './connect-to-google.module.css';
import {useAppSelector} from "../../hooks/redux";
import Logo from "../logo/logo";
import ConnectToGoogleList from "../../shared/consts/connect-to-google-list";
import ConnectItem from "../connect-item/connect-item";
import GoogleIco from "../google-ico/google-ico";

export default function ConnectToGoogle(){
    const step = useAppSelector(({progress_steps}) => progress_steps[2]);
    return (
        <>
            {step.active && (
                <>
                    <form
                        onSubmit={event => event.preventDefault()}
                        className={styles.container}
                    >
                        <div className={styles.header}>
                            <Logo/>
                            <h2
                                children={'Connect your customer support email'}
                                className={styles.title}
                            />
                            <p className={styles.message}>
                                Allows Chad to send automated rote responses on your behalf, for instance to confirm that a customer’s missing item complaint is being evaluated.
                            </p>
                        </div>
                        <div className={styles.main}>
                            {ConnectToGoogleList.map((item,index) => <ConnectItem item={item} key={index}/>)}
                        </div>
                        <div className={styles.footer}>
                            <button
                                className={styles.submit}
                            >
                                <span
                                    className={styles.ico}
                                    children={<GoogleIco/>}
                                />
                                <span
                                    className={styles.connect}
                                    children={'Connect Gmail account'}
                                />
                            </button>
                            <button
                                className={styles.switch}
                                children={'I don’t use Gmail'}
                            />
                        </div>
                    </form>
                </>
            )}
        </>
    )
}