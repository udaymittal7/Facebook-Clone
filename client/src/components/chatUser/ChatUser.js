import './chatUser.css';
import { Avatar } from '@material-ui/core';

export default function ChatUser({ picture, name }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='chatUser'>
      <div className='chatUserPicture'>
        <Avatar src={PF + picture} />
      </div>
      <div className='chatUserName'>{name}</div>
    </div>
  );
}
