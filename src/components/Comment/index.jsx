import styles from './comment.module.css'
import { Avatar } from "../Avatar"
import { ModalComment } from '../ModalComment'
import { useAuth } from '../../hooks/useAuth';
import { IconButton } from '../IconButton';

export const Comment = ({ comment, onDelete, onEdit }) => {

    const { user } = useAuth();

    const isAuthor = user && (user.id === comment.author.id);

    return (<div className={styles.comment}>
        <Avatar author={comment.author} />
        <strong>@{comment.author.name}</strong>
        <p>{comment.text}</p>
        <div className={styles.divider} /> 
        {isAuthor && <ModalComment isEditing onEditComment={onEdit} commentID={comment.id} defaultValue={comment.text} />}
        {isAuthor && <IconButton className={styles.deleteButton} onClick={() => onDelete(comment.id)}>Excluir</IconButton>}
    </div>)
}