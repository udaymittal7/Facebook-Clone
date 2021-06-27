import React from 'react';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SearchIcon from '@material-ui/icons/Search';
import Friend from '../friend/Friend';
import './Widget.css';

function Widget({ friends }) {
  return (
    <div className='widget'>
      <div className='widget-header'>
        <div className='widget-heading'>Contacts</div>
        <div className='widget-header-icon'>
          <VideoCallIcon />
        </div>
        <div className='widget-header-icon'>
          <SearchIcon />
        </div>
      </div>
      <ul className='widget-friendlist'>
        {friends?.length > 0 &&
          friends.map((friend) => (
            <Friend
              name={friend.firstName + ' ' + friend.lastName}
              profilePicture={friend.profilePicture}
            />
          ))}
      </ul>
    </div>
  );
}

export default Widget;
