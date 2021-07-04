import React from 'react';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SearchIcon from '@material-ui/icons/Search';
import Friend from '../friend/Friend';
import './Widget.css';
import { useHistory, Link } from 'react-router-dom';

function Widget({ friends }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();

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
      <Link to='/messages/' style={{ textDecoration: 'none' }}>
        <ul className='widget-friendlist'>
          {friends?.length > 0 &&
            friends.map((friend) => (
              <Friend
                name={friend.firstName + ' ' + friend.lastName}
                profilePicture={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : 'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
                }
              />
            ))}
        </ul>
      </Link>
    </div>
  );
}

export default Widget;
