"use client";
import { CountryProps } from '@/app/types';
import styles from './style.module.css';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Page({ params }: { params: Promise<{ country: string }> }) {

    const resolvedParams = use(params);
    const countrySlug = resolvedParams.country;
    
    const [data, setData] = useState<CountryProps>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true)
                const response = await fetch(`http://localhost:3001/countries/${countrySlug}`)
                const result = await response.json()
                setData(result);
            }catch{

            }finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [countrySlug])

    return (
        <main className={styles.country}>
            {loading ? <div>loading data...</div> : data && 
            <>
                <div className={styles.titleWrapper}>
                    <h1>{data?.name}</h1>
                    <Link href={'/'}>Back</Link>
                </div>
                <p>Population: {data?.population}</p>
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