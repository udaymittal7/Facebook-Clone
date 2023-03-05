import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import NearMeIcon from '@material-ui/icons/NearMe';
import CancelIcon from '@material-ui/icons/Cancel';

import { useDispatch, useSelector } from 'react-redux';
import {
  addComment,
  addLike,
  deletePost,
  getPostsTimeline,
} from '../../redux/actions/postAction';
import '../comment/comment.css';
import { PUBLIC_FOLDER as PF } from '../../constants';

const Comment = ({ comment }) => {
  const theme = localStorage.getItem('theme');

  return (
    <div
      className={`comment__friend ${
        theme === 'dark' && 'comment__friend__dark'
      }`}
    >
      <Link to={`/profile/${comment.user?._id}`}>
        <Avatar
          src={comment.user && PF + comment.user?.profilePicture}
          className="comment___friend__avatar"
        />
      </Link>
      <div
        className={`comment__friend__info ${
          theme === 'dark' && 'comment__friend__info__dark'
        }`}
      >
        <div className="comment__friend__username">
          {comment.user?.firstName + ' ' + comment.user?.lastName}
        </div>
        <div className="comment__friend__content">{comment.content}</div>
      </div>
    </div>
  );
};

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

  const theme = localStorage.getItem('theme');

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [content, setContent] = useState({ content: '' });

  let commentLen = comments.length;

  useEffect(() => {
    dispatch(getPostsTimeline());
    commentLen = comments.length;
  }, [commentLen]);

  const likeHandler = (id) => {
    dispatch(addLike(id));
  };

  const deleteHandler = (id) => {
    dispatch(deletePost(id));
  };

  const commentSubmit = (id, postContent) => {
    dispatch(addComment(id, postContent.content));
    setContent({ content: '' });
    setCommentClick(true);
    dispatch(getPostsTimeline());
  };

  const onChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const likeChecker = likes.filter((like) => like.user.toString() === user._id);

  return (
    <div className={`post ${theme === 'dark' && 'post__dark'}`}>
      <div className="post__top">
        <div className="post__topInfo">
          <Link to={`/profile/${userId}`}>
            <Avatar src={PF + profilePicture} className="post__avatar" />
          </Link>
          <div className="post__topInfoUser">
            <h3>{username}</h3>
            <p>{timestamp}</p>
          </div>
        </div>
        {user && user._id === userId && (
          <div
            className={`post__topInfoDelete ${
              theme === 'dark' && 'post__topInfoDelete__dark'
            }`}
            onClick={() => deleteHandler(profilePostId || postId)}
          >
            <CancelIcon />
          </div>
        )}
      </div>
      <div className="post__bottom">
        <p>{desc}</p>
        {media && (
          <div className="post__image">
            <img src={PF + media} alt="" />
          </div>
        )}
        <div
          className={`post__details ${
            theme === 'dark' && 'post__details__dark'
          }`}
        >
          <div className="post__detail">
            <ThumbUpAltOutlinedIcon />
            {likes.length} likes
          </div>
          <div
            className="post__detail"
            style={{ justifyContent: 'flex-end' }}
            onClick={() => setCommentClick(!commentClick)}
          >
            {comments.length} comments
          </div>
        </div>
        <div
          className={`post__options ${
            theme === 'dark' && 'post__options__dark'
          }`}
        >
          <div
            className={`post__option ${likeChecker.length > 0 && 'icon-blue'} ${
              theme === 'dark' && 'post__option__dark'
            }`}
            onClick={() => likeHandler(profilePostId || postId)}
          >
            <ThumbUpAltOutlinedIcon />
            <p className={likeChecker.length > 0 ? 'blue' : ''}>Like</p>
          </div>
          <div
            className={`post__option ${
              theme === 'dark' && 'post__option__dark'
            }`}
            onClick={() => setCommentClick(!commentClick)}
          >
            <ModeCommentOutlinedIcon />
            <p>Comment</p>
          </div>
          <div
            className={`post__option ${
              theme === 'dark' && 'post__option__dark'
            }`}
          >
            <NearMeIcon />
            <p>Share</p>
          </div>
        </div>
        <form
          className="post__comments__user"
          onSubmit={(e) => {
            e.preventDefault();
            commentSubmit(profilePostId || postId, { content });
          }}
        >
          <Link to={`/profile/${userId}`}>
            <Avatar
              src={PF + user?.profilePicture}
              className="post__comment__avatar"
            />
          </Link>
          <input
            name="content"
            type="text"
            className={`post__comment__input ${
              theme === 'dark' && 'post__comment__input__dark'
            }`}
            placeholder="Write a comment..."
            onChange={onChange}
          />
        </form>
        {commentClick &&
          comments.length > 0 &&
          comments.map((comment) => (
            <>
              <div className="post__comments__friends">
                <Comment
                  key={comment._id}
                  comment={comment}
                  postId={profilePostId || postId}
                />
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Post;
