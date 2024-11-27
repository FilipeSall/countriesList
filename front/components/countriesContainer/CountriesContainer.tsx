"use client";
import styles from './countriescontainer.module.css';
import { useEffect, useState } from "react";
import Navlink from "../NavLink/Navlink";
import { CountryByRegionProps } from '@/app/types';
import Loading from '../loading/Loading';

function CountriesContainer() {
    const [countries, setCountries] = useState<{ [key: string]: CountryByRegionProps[] }>({});
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:3001/countries");
                if (!response.ok) {
                    throw new Error("Failed to fetch countries");
                }
                const result: CountryByRegionProps[] = await response.json();

                // Agrupa os países por região
                const groupedCountries = result.reduce((acc, country) => {
                    if (!acc[country.region]) {
                        acc[country.region] = [];
                    }
                    acc[country.region].push(country);
                    return acc;
                }, {} as { [key: string]: CountryByRegionProps[] });

                setCountries(groupedCountries);
            } catch (error) {
                const err = error as Error;
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Função para filtrar os países com base no nome
    const filterCountries = (country: CountryByRegionProps) => {
        return country.name.toLowerCase().includes(searchQuery.toLowerCase());
    };

    return (
        <section className={styles.countriesWrapper}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Pesquise por um país"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <div className={styles.regionWrappper}>
                {loading ? (
                    <div><Loading /></div>
                ) : Object.keys(countries).length > 0 ? (
                    // Itera pelas regiões agrupadas
                    Object.keys(countries).map((region) => (
                        <div key={region} className={styles.regionContainer}>
                            <h2 className={styles.regionTitle}>{region}</h2> {/*Titulo da região*/}
                            <div className={styles.navLinksWrapper}>
                                {Array.isArray(countries[region]) && countries[region]
                                    .filter(filterCountries) // Aplica o filtro de pesquisa
                                    .map((country, i) => (
                                        <Navlink
                                            country={country.name}
                                            region={country.region}
                                            key={i}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Não foi encontrado nenhum país.</div>
                )}
            </div>
        </section>
    );
}

export default CountriesContainer;
