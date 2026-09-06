import styles from '../NotFound/notfound.module.css'
import sadimage from '../../assets/sad.png'

export const NotFound = () => {
    return (
        <main>
            <h1 className={styles.title}>
                404                
            </h1>
            <div className={styles.img}>
                <img src={sadimage} width={"30px"} alt="sad face" />
            </div>
            <h3 className={styles.description}>                
                Não encontramos a pagina que você está buscando.
            </h3>
        </main>
    )
}