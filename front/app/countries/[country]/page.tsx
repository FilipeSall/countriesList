"use client";
import { CountryProps } from '@/app/types';
import styles from './style.module.css';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import BackBtn from '@/components/backBtn/BackBtn';


function Page({ params }: { params: Promise<{ country: string }> }) {

    const resolvedParams = use(params);
    const countrySlug = resolvedParams.country;

    const [data, setData] = useState<CountryProps>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(`http://localhost:3001/countries/${countrySlug}`)
                const result = await response.json()
                setData(result);
            } catch (err) {
                const error = err as Error;
                setError(error);
            } finally {
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
                        <BackBtn />
                    </div>
                    <p className={styles.popText}>Population: <span>{data?.population}</span></p>
                    {data.flag ? <Image
                        src={data.flag}
                        alt={`Flag of ${data.name}`}
                        width={500}
                        height={300}
                    /> : <p>Flag unavailable</p>}
                </>}
            {error && <p>{error.message}</p>}
        </main>
    )
}

export default Page