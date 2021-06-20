import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DashboardIconOutlined from '@material-ui/icons/DashboardOutlined';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SubscriptionsIconOutlined from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontIcon from '@material-ui/icons/Storefront';
import StorefrontIconOutlined from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SupervisedUserCircleIconOutlined from '@material-ui/icons/SupervisedUserCircleOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useStateValue } from '../../StateProvider';

function Header() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className='header'>
      <div className='header__left'>
        <img
          src='https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512'
          alt='FB-Logo'
        />
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
        <div className='header__info'>
          <Avatar /*{user.photoURL}*/ />
          {/* <h4>{user.displayName}</h4> */}
          <span className='header__info__text'>User</span>
        </div>
        <div className='header__right__icons'>
          <AppsIcon />
        </div>
        <div className='header__right__icons'>
          <NotificationsIcon />
        </div>
        <div className='header__right__icons'>
          <ChatIcon />
        </div>
        <div className='header__right__icons'>
          <ArrowDropDownIcon />
        </div>
      </div>
    </div>
  );
}

export default Header;
