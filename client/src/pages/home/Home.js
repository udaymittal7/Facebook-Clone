import React, { useEffect } from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Widget from '../../components/widget/Widget';
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/authAction";
import './home.css';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Facebook';
    dispatch(loadUser());
  }, []);

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
