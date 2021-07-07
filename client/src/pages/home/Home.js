import React, { useEffect } from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Widget from '../../components/widget/Widget';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/authAction';
import './home.css';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const theme = localStorage.getItem('theme');

  useEffect(() => {
    document.title = 'Facebook';
    dispatch(loadUser());
  }, []);

  return (
    <div>
      <Header />
      <div className={`home-body ${theme === 'dark' ? 'dark-body' : ''}`}>
        <Sidebar />
        <Feed />
        <Widget friends={user?.friends} />
      </div>
    </div>
  );
};

export default Home;
