import styles from './step-controller.module.css';
import {useAppSelector} from "../../hooks/redux";
import ArrowIco from "../arrow-ico/arrow-ico";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducers/appSlice";

export default function StepController(){
    const dispatch = useDispatch();

    const [prevStep,setPrevStep] = useState<null | number>(null);
    const [nextStep,setNextStep] = useState<null | number>(null);
    const progressSteps = useAppSelector(({progress_steps}) => progress_steps);
    const currentStep = useAppSelector(({progress_steps}) => progress_steps.reduce((acc:number,step,index) => {
        if(step.active){
            acc = index;
        }
        return acc;
    },NaN));
    const show =!!progressSteps.find(step => step.connected);

    function calculateNextStep(){
        const dontLastStep = currentStep !== progressSteps.length;
        const finishedStep = progressSteps[currentStep].connected;
        switch (true){
            case dontLastStep && finishedStep:
                setNextStep(currentStep + 1)
            break;
            default:
                setNextStep(null)
        }
    }
    function calculatePrevStep(){
        const dontFirstStep = currentStep !== 0;
        switch (true){
            case dontFirstStep:
                setPrevStep(currentStep - 1)
            break;
            default:
                setPrevStep(null)
        }
    }
    function onClickChangeStep(stepIndex:number | null){
        if(stepIndex !== null){
            dispatch(appSlice.actions.changeStep([currentStep,stepIndex]));
        }
    }

    useEffect(() => {
        calculateNextStep();
        calculatePrevStep();
    },[progressSteps])

    return (
        <>
            {show && (
                <div className={styles.container}>
                    <button
                        disabled={prevStep === null}
                        className={`${styles.button} ${styles.prev}`}
                        onClick={() => onClickChangeStep(prevStep)}
                    >
                        <ArrowIco/>
                        Prev
                    </button>
                    <button
                        disabled={nextStep === null}
                        className={styles.button}
                        onClick={() => onClickChangeStep(nextStep)}
                    >
                        Next
                        <ArrowIco/>
                    </button>
                </div>
            )}
        </>
    )
}