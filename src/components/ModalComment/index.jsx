import { useRef, useState } from "react"
import { IconButton } from "../IconButton"
import { Modal } from "../Modal"
import { Textarea } from "../Textarea"
import { Subheading } from "../Subheading"
import { IconChat } from "../icons/IconChat"
import { IconArrowFoward } from "../icons/IconArrowFoward"
import { Spinner } from "../Spinner"
import styles from './commentmodal.module.css'
import { Button } from "../Button"
import { useAuth } from '../../hooks/useAuth'

export const ModalComment = ({ isEditing, onAddComment, onEditComment, defaultValue = "", commentID, postID }) => {
    const modalRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const { isAuthenticated } = useAuth()    

    const onSubmit = async (formData) => {
        const text = formData.get('text')
        if (!text.trim()) return

        try {
            setLoading(true)
            if (isEditing) {
                await onEditComment(commentID, text)
            } else {
                await onAddComment(text)
            }
            modalRef.current.closeModal()
        } catch (error) {
            console.error('Erro ao criar/atualizar comentário:', error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Modal ref={modalRef}>
                <form action={onSubmit}>
                    <Subheading>{isEditing ? 'Editar comentário:' : 'Deixe seu comentário sobre o post:'}</Subheading>
                    <Textarea required rows={8} name="text" placeholder="Digite aqui..." defaultValue={defaultValue} />
                    <div className={styles.footer}>
                        <Button disabled={loading} type="submit">
                            {loading ? <Spinner /> : <>
                                {isEditing ? 'Atualizar' : 'Comentar'} <IconArrowFoward />
                            </>}
                        </Button>
                    </div>
                </form>
            </Modal>
            <IconButton
                onClick={() => modalRef.current.openModal()}
                disabled={!isAuthenticated}
            >
                <IconChat fill={isEditing ? '#000' : '#ffffff'} />
            </IconButton>
        </>
    )
}