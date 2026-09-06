import { http } from '../api'

export const usePostInteractions = () => {

    const handleLike = async (postID) => {
        try {
            const response = await http.post(`blog-posts/${postID}/like`);
            return response.data.likes; // Retorna o número atualizado de likes
        }
        catch (error) {
            console.error('Erro ao curtir o post:', error)
        }
    }

    
    const handleAddComment = async (postID, text) => {
        if (!text) return

        try {
            const response = await http.post(`/comments/post/${postID}`, { text })
            console.log('Comentário adicionado com sucesso:', response.data)
            return response.data

        } catch (error) {
            console.error('Erro ao adicionar comentário:', error)            
        }
    }

    
    const handleEditComment = async (commentId, newText) => {
        try {
            const response = await http.patch(`comments/${commentId}`, { text: newText })
            console.log('Comentário editado com sucesso:', response.data)
            return response.data
            
        } catch (error) {
            console.error('Erro ao editar comentário:', error)            
        }
    }

    
    const handleDeleteComment = async (commentId) => {
        const isConfirmed = confirm('Você tem certeza que deseja excluir este comentário?');

        if (!isConfirmed) {
            return;
        }
        try {
            const response = await http.delete(`/comments/${commentId}`)
            return response.data
        } catch (error) {
            console.error('Erro ao deletar comentário:', error)
        }
    }
    

    return {        
        handleLike,
        handleAddComment,
        handleEditComment,
        handleDeleteComment
    }
}