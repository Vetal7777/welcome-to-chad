import React from 'react';
import './App.css';
import styles from './App.module.css'
import LoginPage from "./components/login-page/login-page";
import Message from "./components/message/message";

function App() {

    // useEffect(() => {
    //     API.get('/google').then(({data}) => dispatch(appSlice.actions.setGoogleToken(data.token)))
    // },[])

    return (
        <>
            <div className={styles.container}>
                <LoginPage/>
                <Message/>
            </div>
        </>
    );
}

export default App;
