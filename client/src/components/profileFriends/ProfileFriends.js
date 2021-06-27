import React from 'react';
import './profileFriends.css';

const ProfileFriends = ({ friends }) => {
  return (
    <div className='profileFriends-container'>
      <div className='profileFriends-top'>
        <div className='profileFriends-header'>Friends</div>
        <div className='profileFriends-button'>See All Friends</div>
      </div>
      <div className='profileFriends-bottom'>
        {friends?.length > 0 &&
          friends.map(
            (friend) =>
              friend?.profilePicture && (
                <img
                  src={friend?.profilePicture}
                  alt=''
                  className='profileFriends'
                />
              )
          )}
      </div>
    </div>
  );
};

export default ProfileFriends;
