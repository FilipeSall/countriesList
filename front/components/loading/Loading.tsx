import styles from './Loading.module.css';
import loadingIcon from '../../public/loading.svg';
import Image from 'next/image';

function Loading() {
    return (
        <div className={styles.loadingWrapper}>
            <p>Loading data...</p>
            <Image src={loadingIcon} width={50} height={50} alt='loading' />
        </div>
    )
}

export default Loading