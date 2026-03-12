import { ThreeDots } from "react-loader-spinner";
import styles from '../../sass/components/Loader/Loader.module.scss'

export default function Loader() {
    return (
        <div className={styles.loaderWrapper}>
            <ThreeDots
                height="150"
                width="150"
                color="#ff751d"
                ariaLabel="loading"
                visible={true}
            />
        </div>
    );
}