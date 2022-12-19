import styles from './steps.module.css'
import {useAppSelector} from "../../hooks/redux";
import Step from "../step/step";

export default function Steps(){
    const steps = useAppSelector(({progress_steps}) => progress_steps);
    return (
        <>
            <div className={styles.container}>
                {steps.map((step,index) => <Step step={step} connected={index === 1 ? steps[0].connected : false} key={index}/>)}
            </div>
        </>
    )
}