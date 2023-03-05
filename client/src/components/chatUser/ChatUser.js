import './chatUser.css';
import { Avatar } from '@material-ui/core';
import { PUBLIC_FOLDER as PF } from '../../constants';

export default function ChatUser({ picture, name }) {
  return (
    <div className="chatUser">
      <div className="chatUserPicture">
        <Avatar src={PF + picture} />
      </div>
      <div className="chatUserName">{name}</div>
    </div>
  );
}
