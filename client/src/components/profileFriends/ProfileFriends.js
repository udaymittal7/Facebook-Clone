import React from 'react';
import './profileFriends.css';
import { Link } from 'react-router-dom';

const ProfileFriends = ({ friends }) => {
  const theme = localStorage.getItem('theme');
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div
      className={`profileFriends-container ${
        theme === 'dark' && 'profileFriends-dark'
      }`}
    >
      <div className='profileFriends-top'>
        <div className='profileFriends-header'>Friends</div>
        <div
          className={`profileFriends-button ${
            theme === 'dark' && 'profileFriends-button-dark'
          }`}
        >
          See All Friends
        </div>
      </div>
      <div className='profileFriends-bottom'>
        {friends?.length > 0 &&
          friends.map((friend) => (
            <div key={friend._id}>
              <Link
                to={`/profile/${friend._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <img
                  src={
                    (friend?.profilePicture && PF + friend?.profilePicture) ||
                    'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
                  }
                  alt=''
                  className='profileFriends'
                  key={friend._id}
                />
                <div className='profileFriends-name'>
                  {friend.firstName + ' ' + friend.lastName}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileFriends;
