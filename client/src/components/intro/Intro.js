import React from 'react';
import SchoolIcon from '@material-ui/icons/School';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

import './intro.css';

const Intro = ({ work, education, lives, from }) => {
  return (
    <div className='intro-container'>
      <div className='intro-heading'>Intro</div>
      {work?.length > 0 && (
        <div className='intro-row'>
          <BusinessCenterIcon />
          <div className='intro-row-content'>{`Works at ${work.company} as ${work.title}`}</div>
        </div>
      )}
      {education?.length > 0 && (
        <div className='intro-row'>
          <SchoolIcon />
          <div className='intro-row-content'>{`Went to ${
            education.highSchool || education.university
          }`}</div>
        </div>
      )}
      {lives && (
        <div className='intro-row'>
          <HomeIcon />
          <div className='intro-row-content'>{`Lives in ${lives}`}</div>
        </div>
      )}
      {from && (
        <div className='intro-row'>
          <LocationOnIcon />
          <div className='intro-row-content'>{`From ${from}`}</div>
        </div>
      )}
      {!lives && !work?.length && !from && !education?.length && (
        <div className='intro-row'>
          <button className='intro-row-button'>Edit details</button>
        </div>
      )}
    </div>
  );
};

export default Intro;
