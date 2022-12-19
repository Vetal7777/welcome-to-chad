import styles from './login-page.module.css';
import ProgressIndicator from "../progress-indicator/progress-indicator";
import WelcomeToChad from "../welcome-to-chad/welcome-to-chad";
import ConnectToShopify from "../connect-to-shopify/connect-to-shopify";
import ConnectToGoogle from "../connect-to-google/connect-to-google";

export default function LoginPage(){
    return (
        <>
            <div className={styles.container}>
                <ProgressIndicator/>
                <div className={styles.card}>
                    <WelcomeToChad/>
                    <ConnectToShopify/>
                    <ConnectToGoogle/>
                </div>
            </div>
        </>
    )
}