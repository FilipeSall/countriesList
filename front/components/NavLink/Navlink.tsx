import { NavlinkProps } from '@/app/types';
import styles from './Navlink.module.css';
import Link from 'next/link';



function Navlink({country}: NavlinkProps) {

    return (
        <Link className={styles.navlink} href={`http://localhost:3000/countries/${country}`}>{country}</Link>
    )
}

export default Navlink