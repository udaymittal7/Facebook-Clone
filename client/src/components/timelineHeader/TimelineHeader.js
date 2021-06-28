import React, { useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MessageIcon from '@material-ui/icons/Message';
import CancelIcon from '@material-ui/icons/Cancel';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CheckIcon from '@material-ui/icons/Check';
import './timelineHeader.css';

import { useDispatch, useSelector } from 'react-redux';
import { updatePicture } from '../../redux/actions/authAction';

const TimelineHeader = ({
  profilePicture,
  coverPicture,
  username,
  friends,
  myProfile,
  checkFriend,
}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const updateCoverImage = () => {
    const newPost = new FormData();

    newPost.append('media', coverImage);
    newPost.append('cover', true);
    dispatch(updatePicture(user._id, newPost));
    setCoverImage(null);
    window.location.reload();
  };

  const updateProfileImage = () => {
    const newPost = new FormData();

    newPost.append('media', profileImage);
    newPost.append('profile', true);
    dispatch(updatePicture(user._id, newPost));
    setProfileImage(null);
    window.location.reload();
  };

  return (
    <div className='timelineHeader-container'>
      <div className='timelineHeader-coverImage-container'>
        <img
          src={
            coverImage
              ? URL.createObjectURL(coverImage)
              : (coverPicture && PF + coverPicture) ||
                'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
          }
          className='timelineHeader-coverImage'
        />
        {myProfile && (
          <label
            className='timelineHeader-coverImage-edit'
            htmlFor={coverImage}
          >
            {!coverImage ? (
              <>
                <CameraAltIcon className='timelineHeader-coverImage-edit-logo' />
                <div className='timelineHeader-coverImage-edit-text'>
                  Edit Cover Photo
                </div>
                <input
                  type='file'
                  name='media'
                  accept='.png, .jpeg, .jpg'
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </>
            ) : (
              <>
                <CheckIcon
                  className='timelineHeader-coverImage-save'
                  onClick={(e) => {
                    e.preventDefault();
                    updateCoverImage();
                  }}
                />
                <CancelIcon
                  className='timelineHeader-coverImage-cancel'
                  onClick={(e) => {
                    e.preventDefault();
                    setCoverImage(null);
                  }}
                />
              </>
            )}
          </label>
        )}
        <div className='timelineHeader-profileImage-container'>
          <img
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : (profilePicture && PF + profilePicture) ||
                  'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
            }
            alt=''
            className='timelineHeader-profileImage'
          />
          {myProfile && (
            <label
              className='timelineHeader-profileImage-edit'
              htmlFor={profileImage}
            >
              {!profileImage ? (
                <>
                  <CameraAltIcon className='timelineHeader-profileImage-edit-logo' />
                  <input
                    type='file'
                    name='media'
                    accept='.png, .jpeg, .jpg'
                    onChange={(e) => setProfileImage(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </>
              ) : (
                <>
                  <CheckIcon
                    className='timelineHeader-profileImage-save'
                    onClick={(e) => {
                      e.preventDefault();
                      updateProfileImage();
                    }}
                  />
                  <CancelIcon
                    className='timelineHeader-profileImage-edit-cancel'
                    onClick={(e) => {
                      e.preventDefault();
                      setProfileImage(null);
                    }}
                  />
                </>
              )}
            </label>
          )}
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
