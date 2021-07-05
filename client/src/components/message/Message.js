import './message.css';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';

export default function Message({ message, own }) {
  const user = useSelector((state) => state.auth.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className={own ? 'message own' : 'message'}>
      <div className='messageTop'>
        <img
          className='messageImg'
          src={
            own && user.profilePicture
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
