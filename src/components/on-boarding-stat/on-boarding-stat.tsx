import styles from './on-boarding-stat.module.css';
import './slide.css'

export default function OnBoardingStat(){
    return (
        <>
            <div className={styles.container}>
                <span
                    className={styles.number}
                    children={'5x'}
                />
                <span
                    className={styles.content}
                    children={'Acquiring a new customer is 5x more costly than making an unhappy customer happy'}
                />
            </div>
        </>
    )
}