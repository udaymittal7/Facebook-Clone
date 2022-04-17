import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout, loadUser } from '../../redux/actions/authAction';

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme'));
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const onLogout = () => {
    dispatch(logout());
  };

  const themeSetter = (item) => {
    if (theme !== item) {
      setTheme(item);
      window.location.reload();
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgb(0, 0, 0, 0.4)',
      zIndex: 1000,
    },
    content: {
      zIndex: 1000,
      height: '40%',
      width: '22%',
      marginTop: '15px',
      marginLeft: 'auto',
      marginRight: '-25px',
      borderRadius: '8px',
      padding: '15px 0px 20px 0',
      backgroundColor: `${theme === 'dark' ? '#242526' : 'white'}`,
      color: `${theme === 'dark' ? 'white' : 'black'}`,
      border: 'none',
    },
  };

  return (
    <div className={`header ${theme === 'dark' && 'dark__header'}`}>
      <div className="header__left">
        <Link to="/">
          <Avatar
            src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
            alt="FB-Logo"
            className="header__logo"
          />
        </Link>
        <div className={`header__input${theme === 'dark' ? '__dark' : ''}`}>
          <SearchIcon color="disabled" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="header__input__text"
          />
        </div>
      </div>
      <div className="header__middle">
        <div className="header__options header__options--active">
          <HomeIcon />
        </div>
        <div className={`header__options${theme === 'dark' ? '__dark' : ''}`}>
          <SubscriptionsIconOutlined />
        </div>

        <div className={`header__options${theme === 'dark' ? '__dark' : ''}`}>
          <SupervisedUserCircleIconOutlined />
        </div>
        <div className={`header__options${theme === 'dark' ? '__dark' : ''}`}>
          <DashboardIconOutlined />
        </div>
      </div>
      <div className="header__right">
        <div
          className={`header__info ${theme === 'dark' && 'header__info__dark'}`}
          onClick={() => history.push(`/profile/${user?._id}`)}
        >
          <Avatar src={user && PF + user.profilePicture} />
          <span className="header__info__text">{user?.firstName}</span>
        </div>
        <div
          className={`header__right__icons${theme === 'dark' ? '__dark' : ''}`}
        >
          <AppsIcon />
        </div>
        <div
          className={`header__right__icons${theme === 'dark' ? '__dark' : ''}`}
        >
          <NotificationsIcon />
        </div>
        <div
          className={`header__right__icons${theme === 'dark' ? '__dark' : ''}`}
          onClick={() => history.push('/messages/')}
        >
          <ChatIcon />
        </div>
        <div
          className={`header__right__icons${theme === 'dark' ? '__dark' : ''}`}
        >
          <ArrowDropDownIcon onClick={() => setModalIsOpen(true)} />
          <Modal
            preventScroll={true}
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={modalStyle}
            ariaHideApp={false}
          >
            <div className="modal__container">
              <div
                className="modal__header"
                onClick={() => history.push(`/profile/${user._id}`)}
              >
                <Avatar src={user && PF + user.profilePicture} />
                <span className="modal__header__text">
                  {user?.firstName + ' ' + user?.lastName}
                </span>
              </div>
              <div className="modal__row">
                <div className="modal__row__title">
                  <div className="modal__row__text">
                    <Brightness2Icon /> Dark Mode
                  </div>
                </div>
                <div
                  className={`modal__row__option ${
                    theme === 'dark' && 'modal__row__option__dark'
                  }`}
                  onClick={() => themeSetter('light')}
                >
                  <label htmlFor="off" className="modal__row__label">
                    Off
                  </label>
                  <input
                    name="off"
                    className="modal__row__option__radio"
                    type="checkbox"
                    value="Off"
                    checked={theme === 'light'}
                  />
                </div>
                <div
                  className={`modal__row__option ${
                    theme === 'dark' && 'modal__row__option__dark'
                  }`}
                  onClick={() => themeSetter('dark')}
                >
                  <label htmlFor="on" className="modal__row__label">
                    On
                  </label>
                  <input
                    name="on"
                    className="modal__row__option__radio"
                    type="checkbox"
                    value="On"
                    checked={theme === 'dark'}
                  />
                </div>
              </div>
              <div
                className={`modal__bottom ${
                  theme === 'dark' && 'modal__bottom__dark'
                }`}
                onClick={onLogout}
              >
                <MeetingRoomIcon />
                <div className="modal__bottom__text">Log Out</div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Header;
