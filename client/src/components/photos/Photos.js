import React from 'react';
import './photos.css';

const Photos = ({ posts }) => {
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
              post?.image && <img src={post?.image} alt='' className='photos' />
          )}
      </div>
    </div>
  );
};

export default Photos;
