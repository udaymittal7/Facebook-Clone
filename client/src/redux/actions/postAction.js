import axios from 'axios';
import {
  GET_POSTS_TIMELINE,
  GET_POSTS_PROFILE,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from './types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from '../../constants';

toast.configure();

// Get Timeline Posts
export const getPostsTimeline = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(BACKEND_URL + '/api/post/timeline');
      dispatch({
        type: GET_POSTS_TIMELINE,
        payload: res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        }),
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err.response,
        },
      });
    }
  };
};

// Get Profile Posts
export const getPostsProfile = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/post/profile/${id}`);

      dispatch({
        type: GET_POSTS_PROFILE,
        payload: res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        }),
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// Update Post Likes
export const addLike = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/post/${postId}/likeUnlike`
      );

      dispatch({ type: UPDATE_LIKES, payload: { likes: res.data, postId } });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err,
        },
      });
    }
  };
};

// Delete Post
export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/post/delete/${id}`);
      dispatch({ type: DELETE_POST, payload: id });
      toast.success('Post Deleted', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err,
        },
      });
      toast.error('Unable to Delete Post. Please try again', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
};

// Create A New Post
export const createPost = (formData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await axios.post(
        BACKEND_URL + '/api/post/create',
        formData,
        config
      );

      dispatch({ type: ADD_POST, payload: res.data });
      toast.success('New Post Created', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err.response.statusText,
          status: err.response.status,
        },
      });
      toast.error('Unable to Create New Post. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
};

// Add Comment
export const addComment = (postId, formData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.put(
        `${BACKEND_URL}/api/post/${postId}/addComment`,
        formData,
        config
      );

      dispatch({ type: ADD_COMMENT, payload: { comments: res.data, postId } });
      toast.success('Comment Added', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err,
        },
      });
      toast.error('Unable to comment on post. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
};

// Delete Comment
export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `${BACKEND_URL}/api/post/comment/${postId}/${commentId}`
      );

      dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      toast.success('Comment Deleted', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err,
        },
      });
      toast.error('Unable to delete comment. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
};
