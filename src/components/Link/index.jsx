import styles from './link.module.css'
import { Link as RouterLink } from "react-router"

export const Link = ({ children, href, ...props }) => {
    const className = props.className || ''
    return (
        <RouterLink to={href} {...props} className={`${styles.link} ${className}`}>
            {children}
        </RouterLink>
    )
}