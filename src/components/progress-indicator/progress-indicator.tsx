import styles from './progress-indicator.module.css';
import OnBoardingStats from "../on-boarding-stats/on-boarding-stats";
import Steps from "../steps/steps";
import StepController from "../step-controller/step-controller";

export default function ProgressIndicator(){
    return (
        <>
            <div className={styles.container}>
                <Steps/>
                <StepController/>
                <OnBoardingStats/>
            </div>
        </>
    )
}