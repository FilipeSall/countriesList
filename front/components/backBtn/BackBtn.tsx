import Link from 'next/link'
import styles from './backbtn.module.css';
import { IoIosArrowBack } from "react-icons/io";

function BackBtn() {
    return (
        <Link href={'/'} className={styles.backBtn}><IoIosArrowBack />Voltar</Link>
    )
}

export default BackBtn