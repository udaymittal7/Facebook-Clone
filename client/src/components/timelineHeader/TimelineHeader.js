import React from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MessageIcon from '@material-ui/icons/Message';
import './timelineHeader.css';

const TimelineHeader = ({
  profileImage,
  coverImage,
  username,
  friends,
  myProfile,
  checkFriend,
}) => {
  return (
    <div className='timelineHeader-container'>
      <div className='timelineHeader-coverImage-container'>
        <img
          src={
            coverImage ||
            'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
          }
          className='timelineHeader-coverImage'
        />
        <div className='timelineHeader-profileImage-container'>
          <img
            src={
              profileImage ||
              'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
            }
            alt=''
            className='timelineHeader-profileImage'
          />
        </div>
      </div>
      <div className='timelineHeader-username'>{username}</div>
      <div className='timelineHeader-border' />
      <div className='timelineHeader-optionsBar'>
        <div className='timelineHeader-options'>
          <div className='timelineHeader-option timelineHeader-option-active'>
            Posts
          </div>
          <div className='timelineHeader-option'>About</div>
          <div className='timelineHeader-option'>
            Friends{' '}
            <span className='timelineHeader-option-detail'>{friends}</span>
          </div>
          <div className='timelineHeader-option'>Photos</div>
          <div className='timelineHeader-option'>Story Archives</div>
          <div className='timelineHeader-option-dropdown'>
            More
            <span className='timelineHeader-option-dropdown-icon'>
              <ArrowDropDownIcon />
            </span>
          </div>
        </div>
        <div className='timelineHeader-icons'>
          <button
            className='timelineHeader-icon'
            style={{ color: 'white', backgroundColor: '#2e81f4' }}
          >
            {(myProfile && <AddCircleOutlineIcon />) ||
              (checkFriend ? <PersonIcon /> : <PersonAddIcon />)}
            {(myProfile && 'Add to story') ||
              (checkFriend ? 'Friends' : 'Add Friend')}
          </button>
          <button className='timelineHeader-icon'>
            {myProfile ? <EditIcon /> : <MessageIcon />}
            {myProfile ? 'Edit Profile' : 'Message'}
          </button>
          <button className='timelineHeader-icon' style={{ width: 40 }}>
            <MoreHorizIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelineHeader;
