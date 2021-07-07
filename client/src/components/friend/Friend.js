import React from 'react';
import './friend.css';

const Friend = ({ name, profilePicture }) => {
  const theme = localStorage.getItem('theme');

  return (
    <li className={`widget-friend ${theme === 'dark' && 'widget-friend-dark'}`}>
      <div className='widget-profile-image-container'>
        <img src={profilePicture} alt='' className='widget-profile-image' />
        <span className='widget-online'></span>
      </div>
      <span className='widget-username'>{name}</span>
    </li>
  );
};

export default Friend;
