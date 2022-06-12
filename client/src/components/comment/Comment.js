import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import './comment.css';
import { IMAGE_URL } from '../../constants/constants';

const Comment = ({ comment }) => {
  const theme = localStorage.getItem('theme');
  const PF = IMAGE_URL;

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

export default Comment;
