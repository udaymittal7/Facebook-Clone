import { Avatar } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import NearMeIcon from '@material-ui/icons/NearMe';
import CancelIcon from '@material-ui/icons/Cancel';
import Comment from '../comment/Comment';

import { useDispatch, useSelector } from 'react-redux';
import {
  addComment,
  addLike,
  deletePost,
} from '../../redux/actions/postAction';

const Post = ({
  userId,
  postId,
  profilePicture,
  media,
  username,
  timestamp,
  desc,
  likes,
  comments,
  profilePostId,
}) => {
  const [commentClick, setCommentClick] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [content, setContent] = useState({ content: '' });

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = (postId) => {
    dispatch(addLike(postId));
  };

  const deleteHandler = (postId) => {
    dispatch(deletePost(postId));
  };

  const commentSubmit = (postId) => {
    dispatch(addComment(postId, content));
    setContent({ content: '' });
    setCommentClick(true);
  };

  const onChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const likeChecker = likes.filter((like) => like.user.toString() === user._id);

  return (
    <div className='post'>
      <div className='post__top'>
        <div className='post__topInfo'>
          <Link to={`/profile/${userId}`}>
            <Avatar src={PF + profilePicture} className='post__avatar' />
          </Link>
          <div className='post__topInfoUser'>
            <h3>{username}</h3>
            <p>{timestamp}</p>
          </div>
        </div>
        {user && user._id === userId && (
          <div
            className='post__topInfoDelete'
            onClick={() => deleteHandler(profilePostId || postId)}
          >
            <CancelIcon />
          </div>
        )}
      </div>
      <div className='post__bottom'>
        <p>{desc}</p>
        {media && (
          <div className='post__image'>
            <img src={PF + media} alt='' />
          </div>
        )}
        <div className='post__details'>
          <div className='post__detail'>
            <ThumbUpAltOutlinedIcon />
            {likes.length} likes
          </div>
          <div
            className='post__detail'
            style={{ justifyContent: 'flex-end' }}
            onClick={() => setCommentClick(!commentClick)}
          >
            {comments.length} comments
          </div>
        </div>
        <div className='post__options'>
          <div
            className={`post__option ${
              likeChecker.length > 0 ? 'icon-blue' : ''
            }`}
            onClick={() => likeHandler(profilePostId || postId)}
          >
            <ThumbUpAltOutlinedIcon />
            <p className={likeChecker.length > 0 ? 'blue' : ''}>Like</p>
          </div>
          <div
            className='post__option'
            onClick={() => setCommentClick(!commentClick)}
          >
            <ModeCommentOutlinedIcon />
            <p>Comment</p>
          </div>
          <div className='post__option'>
            <NearMeIcon />
            <p>Share</p>
          </div>
        </div>
        <form
          className='post__comments__user'
          onSubmit={(e) => {
            e.preventDefault();
            commentSubmit(profilePostId || postId, { content });
          }}
        >
          <Link to={`/profile/${userId}`}>
            <Avatar
              src={PF + user?.profilePicture}
              className='post__comment__avatar'
            />
          </Link>
          <input
            name='content'
            type='text'
            className='post__comment__input'
            placeholder='Write a comment...'
            onChange={onChange}
          />
        </form>
        {commentClick &&
          comments &&
          comments.map((comment) => {
            return (
              <>
                <div className='post__comments__friends'>
                  <Comment
                    key={comment._id}
                    comment={comment}
                    postId={profilePostId || postId}
                  />
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Post;
