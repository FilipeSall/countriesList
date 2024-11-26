"use client";
import styles from './countriescontainer.module.css';
import { useEffect, useState } from "react";
import Navlink from "../NavLink/Navlink"; 

function CountriesContainer() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:3001/countries");
                if (!response.ok) {
                    throw new Error("Failed to fetch countries");
                }
                const result = await response.json();
                setCountries(result);
            } catch (error) {
                const err = error as Error;
                console.error(err)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <section className={styles.countriesWrapper}>
            {loading ? <div>Carregando</div> : countries && countries.length > 0 ? (
                countries.map((country, i) => (
                    <Navlink
                        country={country}
                        key={i}
                    />
                ))
            ) : (
                <div>Não foi encontrado nenhum país.</div>
            )}
        </section>
    );
}

export default CountriesContainer;
