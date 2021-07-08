import './message.css';
import { format } from 'timeago.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Message({ message, own }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios('/api/user/' + message.sender);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [message.sender]);

  return (
    <div className={own ? 'message own' : 'message'}>
      <div className='messageTop'>
        <img
          className='messageImg'
          src={
            user?.profilePicture
              ? PF + user.profilePicture
              : 'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
          }
          alt=''
        />
        <p className='messageText'>{message.text}</p>
      </div>
      <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  );
}
