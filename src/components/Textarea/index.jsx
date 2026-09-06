import style from './textarea.module.css' 
export const Textarea = ({children, ...rest}) => ( 
<textarea className={style.textarea} {...rest}>{children}</textarea> 
) 
