import { useEffect, useState } from 'react';
import './conversation.css';
import axios from 'axios';
import { Avatar } from '@material-ui/core';

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios('/api/user/' + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className='conversation'>
      <Avatar
        className='conversationImg'
        src={PF + user?.profilePicture}
        alt=''
      />
      <span className='conversationName'>
        {user?.firstName + ' ' + user?.lastName}
      </span>
    </div>
  );
};

export default Conversation;
