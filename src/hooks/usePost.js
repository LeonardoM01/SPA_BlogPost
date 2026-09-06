import { useState, useEffect } from 'react';
import { usePostInteractions } from './usePostInteractions';

export const usePost = (initialPost) => {
  const [post, setPost] = useState(initialPost);
  const { handleLike, handleAddComment, handleEditComment, handleDeleteComment } = usePostInteractions();

  useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);

  const like = async () => {
    const updatedLikes = await handleLike(post.id);
    if (updatedLikes !== undefined) {
      setPost(prev => ({ ...prev, likes: updatedLikes }));
    }
  };

  const addComment = async (text) => {
    const newComment = await handleAddComment(post.id, text);
    if (newComment) {
      setPost(prev => ({
        ...prev,
        comments: [newComment, ...(prev.comments || [])]
      }));
    }
  };

  const editComment = async (commentId, newText) => {
    const updatedComment = await handleEditComment(commentId, newText);
    if (updatedComment) {
      setPost(prev => ({
        ...prev,
        comments: prev.comments.map(c =>
          c.id === commentId ? updatedComment : c
        )
      }));
    }
  };

  const deleteComment = async (commentId) => {
    const isDeleted = await handleDeleteComment(commentId);
    if (isDeleted) {
      setPost(prev => ({
        ...prev,
        comments: prev.comments.filter(c => c.id !== commentId)
      }));
    }
  };

  return { post, like, addComment, editComment, deleteComment };
};