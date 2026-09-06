import styles from './blogpost.module.css'
import { ThumbsUpButton } from "../../components/CardPost/ThumbsUpButton"
import { Author } from "../../components/Author"
import Typography from "../../components/Typography"
import { CommentList } from "../../components/CommentList"
import ReactMarkdown from 'react-markdown'
import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { ModalComment } from "../../components/ModalComment"
import { http } from '../../api'
import { usePostInteractions } from '../../hooks/usePostInteractions'
import { useAuth } from '../../hooks/useAuth'

export const BlogPost = () => {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState([])

    const { handleLike, handleAddComment, handleEditComment, handleDeleteComment } = usePostInteractions()

    async function handleLikeButton(postID) {
        if (!isAuthenticated) return
        const updatedLikes = await handleLike(postID)
        setLikes(updatedLikes)
    }

    async function handleAddCommentButton(postID, text) {
        if (!isAuthenticated) return
        const newComment = await handleAddComment(postID, text)
        if (newComment) {
            setComments(prev => [newComment, ...(prev || [])])
        }
    }

    async function handleEditCommentButton(commentID, newText) {
        if (!isAuthenticated) return

        const updatedComment = await handleEditComment(commentID, newText)

        if (updatedComment) {
            setComments(prevComments =>
                prevComments.map(comment =>
                    comment.id === commentID ? updatedComment : comment
                )
            )
        }
    }

    async function handleDeleteCommentButton(commentID) {
        if (!isAuthenticated) return

        const isDeleted = await handleDeleteComment(commentID)

        if (isDeleted) {
            setComments(prevComments =>
                prevComments.filter(comment => comment.id !== commentID)
            )
        }
    }

    useEffect(() => {
        const loadPost = async () => {
            try {
                const response = await http.get(`blog-posts/slug/${slug}`)
                setPost(response.data)
                setLikes(response.data.likes || 0)
                setComments(response.data.comments || [])
            } catch (error) {
                console.error('Erro ao carregar o post:', error)
                navigate('/not-found')
            }
        }
        loadPost()
    }, [slug, navigate])

    if (!post) {
        return null
    }

    return (
        <main className={styles.main}>
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
                </section>
                <footer className={styles.footer}>
                    <div className={styles.actions}>
                        <div className={styles.action}>
                            <ThumbsUpButton loading={false} onClick={() => handleLikeButton(post.id)} />
                            <p>
                                {likes}
                            </p>
                        </div>
                        <div className={styles.action}>
                            <ModalComment onAddComment={handleAddCommentButton} postID={post?.id} disabled={!isAuthenticated} />
                            <p>
                                {comments.length}
                            </p>
                        </div>
                    </div>
                    <Author author={post.author} />
                </footer>
            </article>
            <Typography variant="h3">Código:</Typography>
            <div className={styles.code}>
                <ReactMarkdown>
                    {post.markdown}
                </ReactMarkdown>
            </div>
            <CommentList comments={comments} onEdit={handleEditCommentButton} onDelete={handleDeleteCommentButton} />
        </main>
    )
}