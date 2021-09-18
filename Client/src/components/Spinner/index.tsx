import classnames from 'classnames'
import styles from './styles.module.scss'
interface ISpinner { 
    color?:string;
    className?:string;
}
const Spinner:React.FC<ISpinner> = ({color,className})=>{
    return (
        <div style={color?{borderColor:color,borderBottomColor:"transparent"}:{}} className={classnames(styles.spinner,className && className)}/>
        
    )
}
export default Spinner