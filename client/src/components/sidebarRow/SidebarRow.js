import { Avatar } from '@material-ui/core';
import React from 'react';
import './SidebarRow.css';

function SidebarRow({ src, url, title }) {
  return (
    <div className='sidebarRow'>
      {src && <Avatar className='sidebarRow__avatar' src={src} />}
      {url && <img className='sidebarRow__image' src={url} alt='' />}
      <span>{title}</span>
    </div>
  );
}

export default SidebarRow;
