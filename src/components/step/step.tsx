import styles from './step.module.css';
import CheckIco from "../check-ico/check-ico";
import {ProgressStepI} from "../../models/progress-step";

export default function Step({step,connected}:{step:ProgressStepI,connected: boolean}){
    return (
        <>
            <div className={`${styles.container} ${step.active ? styles.active : ''} ${step.filled ? styles.filled : ''} ${(connected && !step.active && !step.connected) ? styles.connected : ''} ${step.title === 'Welcome' ? styles.welcome : styles.simple}`}>
                <div className={styles.status}>
                    <span className={styles.line}/>
                    <div className={`${styles.cycle} ${step.active && step.connected && step.title !== 'Welcome' ? styles.connected : ''}`}>
                        {(step.filled || (connected && !step.active)) && (
                            <span
                                className={styles.ready}
                                children={<CheckIco/>}
                            />
                        )}
                        <span
                            className={styles.title}
                            children={step.title}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}