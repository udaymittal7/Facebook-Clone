import './chatUser.css';
import { Avatar } from '@material-ui/core';
import { IMAGE_URL } from '../../constants/constants';

export default function ChatUser({ picture, name }) {
  const PF = IMAGE_URL;

  return (
    <div className="chatUser">
      <div className="chatUserPicture">
        <Avatar src={PF + picture} />
      </div>
      <div className="chatUserName">{name}</div>
    </div>
  );
}
