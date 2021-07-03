import React from 'react';
import './photos.css';

const Photos = ({ posts, profilePicture, coverPicture }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='photos-container'>
      <div className='photos-top'>
        <div className='photos-header'>Photos</div>
        <div className='photos-button'>See All Photos</div>
      </div>
      <div className='photos-bottom'>
        {posts?.length > 0 &&
          posts.map(
            (post) =>
              post?.image && (
                <img
                  src={PF + post?.image}
                  alt=''
                  className='photos'
                  key={post?._id}
                />
              )
          )}
        <img
          src={
            (profilePicture && PF + profilePicture) ||
            'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
          }
          alt=''
          className='photos'
        />
        <img
          src={
            (coverPicture && PF + coverPicture) ||
            'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
          }
          alt=''
          className='photos'
        />
      </div>
    </div>
  );
};

export default Photos;
