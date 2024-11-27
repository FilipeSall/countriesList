import { NavlinkProps } from '@/app/types';
import styles from './Navlink.module.css';
import Link from 'next/link';

function Navlink({ country, region }: NavlinkProps) {

    const regionColors = {
        Europe: '#E54666',
        Asia: '#AD7F58',
        Africa: '#F76B15',
        Oceania: '#E54D2E',
        Americas: '#30A46C',
        Antarctica: '#7CE2FE',
        'Região desconhecida': '#808080',
    };

    return (
        <Link
            className={`${styles.navlink}`}
            style={{ backgroundColor: regionColors[region as keyof typeof regionColors] }}
            href={`http://localhost:3000/countries/${country}`}
        >
            {country}
        </Link>
    )
}

export default Navlink