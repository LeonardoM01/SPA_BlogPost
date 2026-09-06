import styles from './cardpost.module.css'
import { Author } from "../Author"
import { ThumbsUpButton } from "./ThumbsUpButton"
import { ModalComment } from "../ModalComment"
import { Link } from "react-router"
import { useAuth } from '../../hooks/useAuth'
import { usePostInteractions } from '../../hooks/usePostInteractions'
import { useState } from 'react'

export const CardPost = ({ post }) => {
    const { isAuthenticated } = useAuth()

    const [likes, setLikes] = useState(post.likes)
    const [comments, setComments] = useState(post.comments)

    const { handleLike, handleAddComment } = usePostInteractions()

    async function handleLikeButton(postID) {
        if (!isAuthenticated) return
        const updatedLikes = await handleLike(postID)
        setLikes(updatedLikes)
    }

    async function handleAddCommentButton(postID, text) {
        if (!isAuthenticated) return
        const newComment = await handleAddComment(postID, text)
        if (newComment) {
            setComments(prev => [...prev, newComment])
        }
    }

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
                        <ThumbsUpButton loading={false} onClick={() => handleLikeButton(post.id)} disabled={!isAuthenticated} />
                        <p>
                            {likes}
                        </p>
                    </div>
                    <div className={styles.action}>
                                <ModalComment 
                                    postID={post.id}
                                    onAddComment={handleAddCommentButton} 
                                    disabled={!isAuthenticated}
                                />
                        <p>
                            {comments.length}
                        </p>
                    </div>
                </div>
                <Author author={post.author} />
            </footer>
        </article>
    )
}