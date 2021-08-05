import React, { useEffect } from 'react';
import StoryReel from '../storyReel/StoryReel';
import './Feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsTimeline } from '../../redux/actions/postAction';
import { format } from 'timeago.js';

const Feed = () => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsTimeline());
  }, []);

  return (
    <div className='feed'>
      <StoryReel />
      <Share />
      {posts.map((post) => (
        <Post
          key={post?._id}
          profilePicture={post?.user?.profilePicture}
          desc={post?.desc}
          timestamp={format(post?.createdAt)}
          username={post?.user?.firstName + ' ' + post?.user?.lastName}
          media={post?.image}
          likes={post?.likes}
          comments={post?.comments}
          postId={post?._id}
          userId={post?.user?._id}
        />
      ))}
    </div>
  );
};

export default Feed;
