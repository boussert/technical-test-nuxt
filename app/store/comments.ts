import { defineStore } from 'pinia';

interface IComment {
  id: string;
  movieId: number;
  username: string;
  message: string;
  rating: number;
  createdAt: string;
}

export const useCommentsStore = defineStore('comments', () => {
    const comments = ref<IComment[]>([]);

    function loadComments() {
        const data = localStorage.getItem('comments');
        comments.value = data ? JSON.parse(data) : [];
    }

    function saveComments() {
        localStorage.setItem('comments', JSON.stringify(comments.value));
    }

    function addComment(comment: IComment) {
        comments.value.unshift(comment);
        saveComments();
    }

    function getCommentsByMovie(movieId: number) {
        return comments.value.filter(c => c.movieId === movieId);
    }

    return {
        loadComments,
        addComment,
        getCommentsByMovie,
    }
});