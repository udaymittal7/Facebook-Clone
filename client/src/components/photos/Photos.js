import React from 'react';
import './photos.css';
import { IMAGE_URL } from '../../constants/constants';

const Photos = ({ posts, profilePicture, coverPicture }) => {
  const theme = localStorage.getItem('theme');
  const PF = IMAGE_URL;

  return (
    <div className={`photos-container ${theme === 'dark' && 'photo-dark'}`}>
      <div className="photos-top">
        <div className="photos-header">Photos</div>
        <div
          className={`photos-button ${
            theme === 'dark' && 'photos-button-dark'
          }`}
        >
          See All Photos
        </div>
      </div>
      <div className="photos-bottom">
        {posts?.length > 0 &&
          posts.map(
            (post) =>
              post?.image && (
                <img
                  src={PF + post?.image}
                  alt=""
                  className="photos"
                  key={post?._id}
                />
              )
          )}
        <img
          src={
            (profilePicture && PF + profilePicture) ||
            'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
          }
          alt=""
          className="photos"
        />
        <img
          src={
            (coverPicture && PF + coverPicture) ||
            'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
          }
          alt=""
          className="photos"
        />
      </div>
    </div>
  );
};

export default Photos;
