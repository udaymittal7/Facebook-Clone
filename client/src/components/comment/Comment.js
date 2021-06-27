import React from 'react';
import { Avatar } from '@material-ui/core';
import './comment.css';

const Comment = ({ comment, postId }) => {
  return (
    <div className='comment__friend'>
      <Avatar
        src={comment.user && comment.user.profilePicture}
        className='comment___friend__avatar'
      />
      <div className='comment__friend__info'>
        <div className='comment__friend__username'>
          {comment.user.firstName + ' ' + comment.user.lastName}
        </div>
        <div className='comment__friend__content'>{comment.content}</div>
      </div>
    </div>
  );
};

export default Comment;
