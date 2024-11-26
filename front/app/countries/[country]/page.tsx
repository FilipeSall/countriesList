"use client";
import { CountryProps, ParamsPageProps } from '@/app/types';
import styles from './style.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Page({ params }: ParamsPageProps) {

    const [data, setData] = useState<CountryProps>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true)
                const response = await fetch(`http://localhost:3001/countries/${params.country}`)
                const result = await response.json()
                setData(result);
            }catch{

            }finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [params.country])

    return (
        <main className={styles.country}>
            {loading ? <div>Carregando dados...</div> : data && 
            <>
                <div className={styles.titleWrapper}>
                    <h1>{data?.name}</h1>
                    <Link href={'/'}>Voltar</Link>
                </div>
                <p>População: {data?.population}</p>
                <Image 
                        src={data.flag}      
                        alt={`Flag of ${data.name}`} 
                        width={500}            
                        height={300}        
                    />
            </>}
        </main>
    )
}

export default Page