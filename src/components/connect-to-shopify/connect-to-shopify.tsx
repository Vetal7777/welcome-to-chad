import styles from './connect-to-shopify.module.css';
import {useAppSelector} from "../../hooks/redux";
import Logo from "../logo/logo";
import ConnectToShopifyList from "../../shared/consts/connect-to-shopify-list";
import ConnectItem from "../connect-item/connect-item";
import {useEffect, useState} from "react";
import LoadingIco from "../loading-ico/loading-ico";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducers/appSlice";
import API from "../../utils/API";
import CheckIco from "../check-ico/check-ico";
import LogoIco from "../logo-ico/logo-ico";

export default function ConnectToShopify(){
    const dispatch = useDispatch();
    const shopName = useAppSelector(({shop_name}) => shop_name);
    const name = useAppSelector(({name}) => name);
    const step = useAppSelector(({progress_steps}) => progress_steps[1]);
    const isLoading = useAppSelector(({isLoading}) => isLoading);
    const [buttonFilledTitle,setButtonFilledTitle] = useState<string | JSX.Element>('Connect store')
    const [successImage,setSuccessImage] = useState<null | string>(null);
    const filled = step.filled && (successImage !== null) && (shopName !== null);
    const [disconnect,setDisconnect] = useState<boolean>(false);

    useEffect(() => {
        if(isLoading){
            setButtonFilledTitle((<LoadingIco/>));
        }else{
            setButtonFilledTitle('Connect store');
        }
    },[isLoading])

    useEffect(() => {
        if(disconnect && shopName){
            dispatch(appSlice.actions.toggleMessageStatus());
        }
    },[disconnect])

    function onSubmit(){
        switch (true){
            case !filled:
                dispatch(appSlice.actions.toggleIsLoading());
                API.get(
                    '/shopify',
                    { params: { name: name} })
                    .then(({data}) => {
                        if (data.status === 'success'){
                            dispatch(appSlice.actions.setShopName(data.shop_name));
                            dispatch(appSlice.actions.setShopToken(data.token));
                            dispatch(appSlice.actions.toggleIsLoading());
                            setSuccessImage(data.shop_logo_url);
                            dispatch(appSlice.actions.setProgressSteps({...step,filled: true}))
                        }else{
                            dispatch(appSlice.actions.toggleIsLoading());
                            dispatch(appSlice.actions.toggleErrorStatus())
                        }
                    })
            break;
            case filled:
                dispatch(appSlice.actions.setProgressSteps({...step,connected: true}))
                dispatch(appSlice.actions.changeStep([1,2]))
            break;
        }
    }
    function onSwitch(){
        setDisconnect(true)
        dispatch(appSlice.actions.setShopToken(null));
        setSuccessImage(null);
        dispatch(appSlice.actions.setProgressSteps({...step,filled: false}))
        setTimeout(() => setDisconnect(false),1000);
    }

    return (
        <>
            {step.active && (
                <form
                    className={`${styles.container} ${filled ? styles.filled : ''} ${disconnect ? styles.disconnect : ''}`}
                    onSubmit={event => event.preventDefault()}
                >
                    {(!filled && !disconnect) && (
                        <>
                            <div className={styles.header}>
                                <Logo/>
                                <h2
                                    className={styles.title}
                                    children={'Connect your Shopify store'}
                                />
                                <p className={styles.message}>
                                    This installs the Chad widget in your Shopify store and sets it up to display information
                                    that is relevant to your customers.
                                </p>
                            </div>
                            <div className={styles.main}>
                                {ConnectToShopifyList.map((item,index) => (<ConnectItem item={item} key={index}/>))}
                            </div>
                            <div className={styles.footer}>
                                <button
                                    onClick={onSubmit}
                                    className={styles.submit}
                                    children={buttonFilledTitle}
                                />
                                <button
                                    className={styles.switch}
                                    children={'I don’t use Shopify'}
                                />
                            </div>
                        </>
                    )}
                    {(filled && !disconnect) && (
                        <>
                            <div className={styles.header}>
                                <img
                                    src={successImage}
                                    className={styles.image}
                                />
                                <span
                                    className={styles.check}
                                    children={<CheckIco/>}
                                />
                            </div>
                            <div className={styles.main}>
                                <h2
                                    className={styles.title}
                                    children={step.connected ? `${shopName.toUpperCase()} already connected` : 'Store connected'}
                                />
                                {!step.connected && (<p className={styles.message}>
                                    Chad is now able to manage customer support requests for {shopName.toUpperCase()}.
                                </p>)}
                            </div>
                            <div className={styles.footer}>
                                <button
                                    onClick={onSubmit}
                                    className={styles.submit}
                                    children={'Continue'}
                                />
                                <div className={styles.switch}>
                                    <p
                                        className={styles.switch}
                                        children={step.connected ? 'Not your store?' : 'Wrong store?'}
                                    />
                                    <button
                                        onClick={onSwitch}
                                        className={styles.switch}
                                        children={'Connect another one'}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {disconnect && (
                        <>
                            <div className={styles.disconnect}>
                                <div className={styles.ico}>
                                    <LogoIco/>
                                </div>
                                <span
                                    className={styles.message}
                                    children={'Disconnecting store...'}
                                />
                            </div>
                        </>
                    )}
                </form>
            )}
        </>
    )
}