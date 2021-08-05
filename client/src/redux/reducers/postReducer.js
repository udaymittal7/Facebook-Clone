import {
  GET_POSTS_TIMELINE,
  GET_POSTS_PROFILE,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from '../actions/types';

const initialState = {
  posts: [],
  profilePosts: [],
  loading: true,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_TIMELINE:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_POSTS_PROFILE:
      return {
        ...state,
        profilePosts: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: action.payload.comments,
              }
            : post
        ),
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment._id !== action.payload.commentId
                ),
              }
            : post
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
