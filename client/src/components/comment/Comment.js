import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import './comment.css';

const Comment = ({ comment, postId }) => {
  return (
    <div className='comment__friend'>
      <Link to={`/profile/${comment.user?._id}`}>
        <Avatar
          src={comment.user && comment.user?.profilePicture}
          className='comment___friend__avatar'
        />
      </Link>
      <div className='comment__friend__info'>
        <div className='comment__friend__username'>
          {comment.user?.firstName + ' ' + comment.user?.lastName}
        </div>
        <div className='comment__friend__content'>{comment.content}</div>
      </div>
    </div>
  );
};

export default Comment;
