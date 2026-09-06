import styles from './cardpost.module.css'
import { Author } from "../Author"
import { ThumbsUpButton } from "./ThumbsUpButton"
import { ModalComment } from "../ModalComment"
import { Link } from "react-router"
import { useAuth } from '../../hooks/useAuth'
import { usePost } from '../../hooks/usePost'

export const CardPost = ({ post: initialPost }) => {

  const { isAuthenticated } = useAuth();
  const { post, like, addComment } = usePost(initialPost);

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <figure className={styles.figure}>
                    <img
                        src={post.cover}
                        alt={`Capa do post de titulo: ${post.title}`}
                    />
                </figure>
            </header>
            <section className={styles.body}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <Link to={`/blog-post/${post.slug}`}>Ver detalhes</Link>
            </section>
            <footer className={styles.footer}>
                <div className={styles.actions}>
                    <div className={styles.action}>
                        <ThumbsUpButton loading={false} onClick={like} disabled={!isAuthenticated} />
                        <p>
                            {post.likes}
                        </p>
                    </div>
                    <div className={styles.action}>
                                <ModalComment 
                                    postID={post.id}
                                    onAddComment={addComment} 
                                    disabled={!isAuthenticated}
                                />
                        <p>
                            {post.comments.length}
                        </p>
                    </div>
                </div>
                <Author author={post.author} />
            </footer>
        </article>
    )
}