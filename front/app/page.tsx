import CountriesContainer from "../components/countriesContainer/CountriesContainer";
import styles from "./page.module.css";

export default function Home() {

  return (
    <main className={styles.pageContainer}>
        <h1>Lista de todos os países disponíveis:</h1>    
        <CountriesContainer />  
    </main>
  );
}
