import styles from './message.module.css';
import {useAppSelector} from "../../hooks/redux";
import {useEffect, useState} from "react";
import ExitIco from "../exit-ico/exit-ico";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducers/appSlice";

export default function Message(){
    const dispatch = useDispatch();

    const shopName= useAppSelector(({shop_name}) => shop_name);
    const isShowError = useAppSelector(({error}) => error);
    const isShowMessage = useAppSelector(({message}) => message);
    const [message,setMessage] = useState<string>('');
    const steps = useAppSelector(({progress_steps}) => progress_steps);
    const activeIndex = steps.reduce((acc,item,index) => {
        if(item.active){
            acc = index
        }
        return acc;
    },NaN)

    useEffect(() => {
        switch (true){
            case isShowError && activeIndex === 1:
                setMessage('Chad couldn’t connect to your Shopify account. Please try again.')
            break;
            case isShowMessage && activeIndex === 1:
                setMessage(`${(shopName as string).toUpperCase()} has been disconnected.`)
            break;
        }
    },[activeIndex,isShowMessage,isShowError])

    function onSubmit(){
        switch (true){
            case isShowError:
                dispatch(appSlice.actions.toggleErrorStatus())
            break;
            case isShowMessage:
                dispatch(appSlice.actions.toggleMessageStatus())
            break;
        }
    }

    return (
        <>
            {(isShowMessage || isShowError) && (
                <>
                    <div className={`${styles.container} ${isShowError ? styles.error : styles.message}`}>
                        <span className={styles.line}/>
                        <p
                            className={styles.content}
                            children={message}
                        />
                        <button
                            className={styles.submit}
                            children={<ExitIco/>}
                            onClick={onSubmit}
                        />
                    </div>
                </>
            )}
        </>
    )
}