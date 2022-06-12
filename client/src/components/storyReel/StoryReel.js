import React from 'react';
import { useSelector } from 'react-redux';
import Story from '../story/Story';
import '../storyReel/StoryReel.css';
import { IMAGE_URL } from '../../constants/constants';

function StoryReel() {
  const { user } = useSelector((state) => state.auth);

  const PF = IMAGE_URL;

  return (
    <div className="storyreel">
      <Story
        image={PF + user.coverPicture}
        title="Facebook Story"
        profileSrc={PF + user.profilePicture}
      />
      <Story
        image={PF + user.coverPicture}
        title="Facebook Story"
        profileSrc={PF + user.profilePicture}
      />
      <Story
        image={PF + user.coverPicture}
        title="Facebook Story"
        profileSrc={PF + user.profilePicture}
      />
      <Story
        image={PF + user.coverPicture}
        title="Facebook Story"
        profileSrc={PF + user.profilePicture}
      />
      <Story
        image={PF + user.coverPicture}
        title="Facebook Story"
        profileSrc={PF + user.profilePicture}
      />
    </div>
  );
}

export default StoryReel;
