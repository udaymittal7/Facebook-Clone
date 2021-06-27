import React from 'react';
import './friend.css';

const Friend = ({ name, profilePicture }) => {
  return (
    <li className='widget-friend'>
      <div className='widget-profile-image-container'>
        <img
          src={
            profilePicture ||
            'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
          }
          alt=''
          className='widget-profile-image'
        />
        <span className='widget-online'></span>
      </div>
      <span className='widget-username'>{name}</span>
    </li>
  );
};

export default Friend;
