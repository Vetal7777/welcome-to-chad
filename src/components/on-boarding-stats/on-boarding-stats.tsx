import styles from './on-boarding-stats.module.css'
import OnBoardingStat from "../on-boarding-stat/on-boarding-stat";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function OnBoardingStats(){
    return (
        <>
            <div className={styles.container}>
                <Carousel
                    className={styles.slider}
                    showThumbs={false}
                    autoPlay={true}
                    showStatus={false}
                    infiniteLoop={true}
                    showArrows={false}
                >
                    {
                        new Array(5)
                            .fill(0)
                            .map((slide,index) => <OnBoardingStat key={index}/>)
                    }
                </Carousel>
            </div>
        </>
    )
}