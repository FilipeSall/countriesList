import CountriesContainer from "../components/countriesContainer/CountriesContainer";
import styles from "./page.module.css";

export default function Home() {

  return (
    <main className={styles.pageContainer}>
        <h1>List of all available countries:</h1>    
        <CountriesContainer />  
    </main>
  );
}
