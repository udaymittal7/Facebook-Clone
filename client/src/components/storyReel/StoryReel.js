import React from 'react';
import { useSelector } from 'react-redux';
import Story from '../story/Story';
import '../storyReel/StoryReel.css';
import { PUBLIC_FOLDER as PF } from '../../constants';

function StoryReel() {
  const { user } = useSelector((state) => state.auth);

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
