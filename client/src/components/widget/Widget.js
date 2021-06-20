import React from 'react';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SearchIcon from '@material-ui/icons/Search';
import Friend from '../friend/Friend';
import './Widget.css';

function Widget() {
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
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
      </ul>
    </div>
  );
}

export default Widget;
