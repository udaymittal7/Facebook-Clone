import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIconOutlined from '@material-ui/icons/DashboardOutlined';
import SubscriptionsIconOutlined from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontIconOutlined from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleIconOutlined from '@material-ui/icons/SupervisedUserCircleOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgb(0, 0, 0, 0.4)',
      zIndex: 1000,
    },
    content: {
      zIndex: 1000,
      height: '35%',
      width: '22%',
      marginTop: '15px',
      marginLeft: 'auto',
      marginRight: '-25px',
      borderRadius: '8px',
      padding: '15px 0px 20px 0',
    },
  };

  return (
    <div className='header'>
      <div className='header__left'>
        <Link to='/'>
          <Avatar
            src='https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512'
            alt='FB-Logo'
            className='header__logo'
          />
        </Link>
        <div className='header__input'>
          <SearchIcon color='disabled' />
          <input
            type='text'
            placeholder='Search Facebook'
            className='header__input__text'
          />
        </div>
      </div>
      <div className='header__middle'>
        <div className='header__options header__options--active'>
          <HomeIcon />
        </div>
        <div className='header__options'>
          <SubscriptionsIconOutlined />
        </div>
        <div className='header__options'>
          <StorefrontIconOutlined />
        </div>
        <div className='header__options'>
          <SupervisedUserCircleIconOutlined />
        </div>
        <div className='header__options'>
          <DashboardIconOutlined />
        </div>
      </div>
      <div className='header__right'>
        <div
          className='header__info'
          onClick={() => history.push(`/profile/${user?._id}`)}
        >
          <Avatar src={user && PF + user.profilePicture} />
          <span className='header__info__text'>{user?.firstName}</span>
        </div>
        <div className='header__right__icons'>
          <AppsIcon />
        </div>
        <div className='header__right__icons'>
          <NotificationsIcon />
        </div>
        <div
          className='header__right__icons'
          onClick={() => history.push('/messages/')}
        >
          <ChatIcon />
        </div>
        <div className='header__right__icons'>
          <ArrowDropDownIcon onClick={() => setModalIsOpen(true)} />
          <Modal
            preventScroll={true}
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={modalStyle}
            ariaHideApp={false}
          >
            <div className='modal__container'>
              <div className='modal__header'>
                <Avatar src={user && PF + user.profilePicture} />
                <span className='modal__header__text'>
                  {user?.firstName + ' ' + user?.lastName}
                </span>
              </div>
              <div className='modal__row'>
                <div className='modal__row__title'>
                  <div className='modal__row__text'>
                    <Brightness2Icon /> Dark Mode
                  </div>
                </div>
                <div className='modal__row__option'>
                  <label htmlFor='off' className='modal__row__label'>
                    Off
                  </label>
                  <input
                    name='off'
                    className='modal__row__option__radio'
                    type='checkbox'
                    value='Off'
                  />
                </div>
                <div className='modal__row__option'>
                  <label htmlFor='on' className='modal__row__label'>
                    On
                  </label>
                  <input
                    name='on'
                    className='modal__row__option__radio'
                    type='checkbox'
                    value='On'
                  />
                </div>
              </div>
              <div className='modal__bottom'>
                <MeetingRoomIcon />
                <div className='modal__bottom__text'>Log Out</div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Header;
