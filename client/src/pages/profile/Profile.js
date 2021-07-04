import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import TimelineHeader from '../../components/timelineHeader/TimelineHeader';
import Intro from '../../components/intro/Intro';
import Photos from '../../components/photos/Photos';
import ProfileFriends from '../../components/profileFriends/ProfileFriends';
import Share from '../../components/share/Share';
import Post from '../../components/post/Post';
import { getPostsProfile } from '../../redux/actions/postAction';
import { loadProfileUser } from '../../redux/actions/authAction';
import './profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FilterListIcon from '@material-ui/icons/FilterList';

const Profile = () => {
  const { profilePosts } = useSelector((state) => state.post);
  const { profileUser, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadProfileUser(id));
    dispatch(getPostsProfile(id));
  }, [profileUser]);

  const checkFriend = () => {
    const userFriend = user.friends.filter((friend) => {
      return friend._id === profileUser?._id;
    });
    return userFriend.length > 0;
  };

  const checkRequest = () => {
    const userRequests = user?.receivedRequests.filter((request) => {
      return request.user.toString() === profileUser?._id;
    });
    return userRequests?.length > 0;
  };

  const checkPending = () => {
    const userRequests = user?.sentRequests.filter((request) => {
      return request.user.toString() === profileUser?._id;
    });

    return userRequests.length > 0;
  };

  return (
    <>
      <Header />
      <TimelineHeader
        profilePicture={profileUser?.profilePicture}
        coverPicture={profileUser?.coverPicture}
        username={profileUser?.firstName + ' ' + profileUser?.lastName}
        friends={profileUser?.friends.length}
        myProfile={user?._id === profileUser?._id}
        checkFriend={checkFriend()}
        checkRequest={checkRequest()}
        checkPending={checkPending()}
      />
      <div className='profile-container'>
        <div className='profile-left'>
          <Intro
            work={profileUser?.work}
            education={profileUser?.education}
            from={profileUser?.from}
            lives={profileUser?.lives}
          />
          <Photos
            posts={profilePosts}
            profilePicture={profileUser?.profilePicture}
            coverPicture={profileUser?.coverPicture}
          />
          <ProfileFriends friends={profileUser?.friends} />
        </div>
        <div className='profile-right'>
          {user?._id === profileUser?._id && <Share />}
          <div className='profile-right-posts'>
            <div className='profile-right-posts-header-container'>
              <div className='profile-right-posts-header'>Posts</div>
              <button className='profile-right-posts-button'>
                <FilterListIcon />{' '}
                <span className='profile-right-posts-detail'>Posts</span>
              </button>
            </div>
          </div>
          {profilePosts.map((profilePost) => (
            <Post
              key={profilePost._id}
              profilePicture={profilePost.user.profilePicture}
              desc={profilePost.desc}
              timestamp={profilePost.updatedAt}
              username={
                profilePost.user.firstName + ' ' + profilePost.user.lastName
              }
              media={profilePost.image}
              likes={profilePost.likes}
              comments={profilePost.comments}
              profilePostId={profilePost._id}
              userId={profilePost.user._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
