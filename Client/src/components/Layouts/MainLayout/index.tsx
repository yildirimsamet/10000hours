import Nav from "../../Nav"
import styles from "./styles.module.scss"
interface IMainLayout {
    children?: React.ReactNode | React.ReactChildren | any
}
const MainLayout: React.FC<IMainLayout> =({children})=>{
    return(
        <div className={styles.mainLayout}>
            <Nav/>
           {children}
        </div>
    )
}
export default MainLayout