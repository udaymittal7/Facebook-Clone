import React from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Widget from '../../components/widget/Widget';
import './home.css';

const Home = () => {
  return (
    <div>
      <Header />
      <div className='home-body'>
        <Sidebar />
        <Feed />
        <Widget />
      </div>
    </div>
  );
};

export default Home;
