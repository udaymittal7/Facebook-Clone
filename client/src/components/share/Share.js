import { Avatar } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import CancelIcon from '@material-ui/icons/Cancel';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import React, { useRef, useState } from 'react';
import './share.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost, getPostsTimeline } from '../../redux/actions/postAction';
import { PUBLIC_FOLDER as PF } from '../../constants';

const Share = () => {
  const theme = localStorage.getItem('theme');

  const [media, setMedia] = useState(null);

  const desc = useRef();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = new FormData();

    if (media) {
      newPost.append('media', media);
    }
    newPost.append('desc', desc.current.value);
    dispatch(createPost(newPost));
    desc.current.value = '';
    setMedia(null);

    dispatch(getPostsTimeline());
  };

  return (
    <form
      className={`share ${theme === 'dark' && 'share__dark'}`}
      onSubmit={handleSubmit}
    >
      <div className={`share__top ${theme === 'dark' && 'share__top__dark'}`}>
        <Link to={`/profile/${user._id}`}>
          <Avatar src={PF + user.profilePicture} />
        </Link>
        <input
          ref={desc}
          className="share__input"
          placeholder={`What's on your mind, ${user.firstName}?`}
        />
        <button className="share__button" type="submit">
          Share
        </button>
      </div>
      {media && (
        <div className="share__imageContainer">
          <img
            src={URL.createObjectURL(media)}
            alt=""
            className="share__image"
          />
          <CancelIcon
            className="share__cancelImage"
            onClick={() => setMedia(null)}
          />
        </div>
      )}
      <div className="share__bottom">
        <div
          className={`share__options ${
            theme === 'dark' && 'share__options__dark'
          }`}
        >
          <VideocamIcon style={{ color: 'red' }} />
          <div>Live video</div>
        </div>
        <label
          className={`share__options ${
            theme === 'dark' && 'share__options__dark'
          }`}
          htmlFor={media}
        >
          <PhotoLibraryIcon style={{ color: 'green' }} />
          <div>Photo/Video</div>
          <input
            type="file"
            name="media"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => setMedia(e.target.files[0])}
            style={{ display: 'none' }}
          />
        </label>
        <div
          className={`share__options ${
            theme === 'dark' && 'share__options__dark'
          }`}
        >
          <InsertEmoticonIcon style={{ color: 'orange' }} />
          <div>Feeling/Activity</div>
        </div>
      </div>
    </form>
  );
};

export default Share;
