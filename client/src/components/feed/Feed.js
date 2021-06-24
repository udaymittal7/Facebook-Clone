import React, { useEffect, useState } from 'react';
import StoryReel from '../storyReel/StoryReel';
import './Feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsTimeline } from '../../redux/actions/postAction';

const Feed = () => {
  const { posts } = useSelector((state) => state.post);
  // const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsTimeline());
    console.log(posts);
  }, []);

  return (
    <div className='feed'>
      <StoryReel />

      <Share />

      {posts.map((post) => (
        <Post
          key={post._id}
          profilePicture={post.user.profilePicture}
          desc={post.desc}
          timestamp={post.updatedAt}
          username={post.user.firstName + ' ' + post.user.lastName}
          media={post.media}
        />
      ))}
    </div>
  );
};

export default Feed;
