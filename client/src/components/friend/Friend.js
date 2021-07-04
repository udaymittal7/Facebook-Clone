import React from 'react';
import './friend.css';

const Friend = ({ name, profilePicture }) => {
  return (
    <li className='widget-friend'>
      <div className='widget-profile-image-container'>
        <img src={profilePicture} alt='' className='widget-profile-image' />
        <span className='widget-online'></span>
      </div>
      <span className='widget-username'>{name}</span>
    </li>
  );
};

export default Friend;
