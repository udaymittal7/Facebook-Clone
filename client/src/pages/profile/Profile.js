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

const Profile = () => {
  const { profilePosts } = useSelector((state) => state.post);
  const { profileUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  // const [profileImage, setProfileImage] = useState(null);
  // const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    dispatch(loadProfileUser(id));
    dispatch(getPostsProfile(id));
  }, [id]);

  return (
    <>
      <Header />
      <TimelineHeader
        profileImage={profileUser?.profilePicture}
        coverImage={profileUser?.coverPicture}
        username={profileUser?.firstName + ' ' + profileUser?.lastName}
        friends={profileUser?.friends.length}
      />
      <div className='profile-container'>
        <div className='profile-left'>
          <Intro
            work={profileUser?.work}
            education={profileUser?.education}
            from={profileUser?.from}
            lives={profileUser?.lives}
          />
          <Photos posts={profilePosts} />
          <ProfileFriends friends={profileUser.friends} />
        </div>
        <div className='profile-right'>
          <Share />
          {profilePosts.map((profilePost) => (
            <Post
              key={profilePost._id}
              profilePicture={profilePost.user.profilePicture}
              desc={profilePost.desc}
              timestamp={profilePost.updatedAt}
              username={
                profilePost.user.firstName + ' ' + profilePost.user.lastName
              }
              media={profilePost.media}
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
