import React from 'react';
import './friend.css';

const Friend = () => {
  return (
    <li className='widget-friend'>
      <div className='widget-profile-image-container'>
        <img
          src='https://randomuser.me/api/portraits/men/79.jpg'
          alt=''
          className='widget-profile-image'
        />
        <span className='widget-online'></span>
      </div>
      <span className='widget-username'>Uday</span>
    </li>
  );
};

export default Friend;
