import styles from './welcome-to-chad.module.css'
import Logo from "../logo/logo";
import Input from "../input/input";
import {useEffect, useState} from "react";
import {FormFieldI} from "../../models/form-field";
import {FormFields} from "../../shared/consts/form-fields";
import {useAppSelector} from "../../hooks/redux";
import LoadingIco from "../loading-ico/loading-ico";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducers/appSlice";

export default function WelcomeToChad(){
    const dispatch = useDispatch();

    const step = useAppSelector(({progress_steps}) => progress_steps[0]);
    const [fields,setFields] = useState<FormFieldI[]>(FormFields)
    const [error,setError] = useState<boolean>(false);
    const filled = ![...fields].map(item => item.value).includes('');
    const isLoading = useAppSelector(({isLoading}) => isLoading);
    const [buttonTitle,setButtonTitle] = useState<string | JSX.Element>('Create account')

    function setProperty(value:string,field:FormFieldI){
        setFields([...fields].map(item => item.type === field.type ? {...item,value: value} : item))
    }
    function onConnect(){
        dispatch(appSlice.actions.toggleIsLoading());
        const data:{[key:string]:string} = {}
        fields.forEach(field => data[field.type] = field.value)
        dispatch(appSlice.actions.setName(data.name));
        dispatch(appSlice.actions.setEmail(data.email));
        dispatch(appSlice.actions.setPassword(data.password));
        dispatch(appSlice.actions.setProgressSteps({...step,connected: true}))
        setTimeout(() => dispatch(appSlice.actions.toggleIsLoading()),1000)
    }
    function onSubmit(){
        switch (true){
            case step.filled && !step.connected:
                onConnect();
            break;
            case step.filled && step.connected:
                dispatch(appSlice.actions.changeStep([0,1]));
            break;
            default:
                setError(true)
        }
    }

    useEffect(() => {
        dispatch(appSlice.actions.setProgressSteps({...step,filled: filled}))
    },[filled])

    useEffect(() => {
        if(isLoading){
            setButtonTitle((<LoadingIco/>));
        }
        if(step.connected && !isLoading){
            setButtonTitle('Continue')
        }
    },[isLoading,step])

    return (
        <>
            {step.active && (
                <form
                    onSubmit={event => event.preventDefault()}
                    className={styles.container}
                >
                    <div className={styles.header}>
                        <Logo/>
                        <h2
                            className={styles.title}
                            children={'Welcome to Chad'}
                        />
                        <p className={styles.content}>
                            Go live in 10 minutes! Chad's self-service widget empowers your customers to manage orders and
                            track shipments—with Chad, you can offer fast support 24/7 without going crazy.
                        </p>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.fields}>
                            {fields.map((field, index) => (
                                <Input
                                    ready={step.connected}
                                    error={error && !field.value}
                                    field={field}
                                    key={index}
                                    onChange={value => setProperty(value, field)}
                                />
                            ))}
                        </div>
                        <button
                            className={styles.submit}
                            children={buttonTitle}
                            onClick={onSubmit}
                        />
                    </div>
                    <div className={styles.footer}>
                        Already have an account?
                        <button
                            children={'Login'}
                            className={styles.switch}
                        />
                    </div>
                </form>
            )}
        </>
    )
}