import React, { useEffect, useState } from 'react';
import SchoolIcon from '@material-ui/icons/School';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import Add from '@material-ui/icons/Add';
import Cancel from '@material-ui/icons/Cancel';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfileUser, updateUser } from '../../redux/actions/authAction';
import './intro.css';

const Intro = () => {
  const theme = localStorage.getItem('theme');
  const { profileUser, user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const title = profileUser?.work?.title;
  const company = profileUser?.work?.company;
  const highSchool = profileUser?.education?.highSchool;
  const university = profileUser?.education?.university;
  const lives = profileUser?.lives;
  const from = profileUser?.from;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({
    title,
    company,
    university,
    highSchool,
    lives,
    from,
  });

  const profileUserId = useParams();

  useEffect(() => {
    dispatch(loadProfileUser(profileUserId.id));
  }, [profileUserId.id]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    user.work = {};
    user.education = {};
    user.work.title = user.title || profileUser?.work?.title;
    user.work.company = user.company || profileUser?.work?.company;
    user.education.highSchool =
      user.highSchool || profileUser?.education?.highSchool;
    user.education.university =
      user.university || profileUser?.education?.university;
    delete user.title;
    delete user.company;
    delete user.highSchool;
    delete user.university;

    dispatch(updateUser(profileUserId.id, user));
    setModalIsOpen(false);
    setEdit(false);
    window.location.reload();
  };

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgb(0, 0, 0, 0.4)',
      zIndex: 1000,
    },
    content: {
      zIndex: 1000,
      height: '80%',
      width: '45%',
      marginTop: '30px',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '8px',
      padding: '15px 0px 20px 0',
    },
  };

  return (
    <div className={`intro-container ${theme === 'dark' && 'intro-dark'}`}>
      <div className='intro-heading'>Intro</div>
      {profileUser &&
        profileUser.work &&
        profileUser.work?.title &&
        profileUser.work?.company && (
          <div className='intro-row'>
            <BusinessCenterIcon />
            <div className='intro-row-content'>{`Works at ${profileUser?.work?.company} as ${profileUser?.work?.title}`}</div>
          </div>
        )}
      {profileUser &&
        profileUser.education &&
        (profileUser.education?.highSchool ||
          profileUser.education?.university) && (
          <div className='intro-row'>
            <SchoolIcon />
            <div className='intro-row-content'>{`Went to ${
              profileUser?.education?.highSchool ||
              profileUser?.education?.university
            }`}</div>
          </div>
        )}
      {profileUser && profileUser?.lives && (
        <div className='intro-row'>
          <HomeIcon />
          <div className='intro-row-content'>{`Lives in ${profileUser?.lives}`}</div>
        </div>
      )}
      {profileUser && profileUser?.from && (
        <div className='intro-row'>
          <LocationOnIcon />
          <div className='intro-row-content'>{`From ${profileUser?.from}`}</div>
        </div>
      )}

      {profileUser?._id === currentUser._id && (
        <div className='intro-row'>
          <button
            className={`intro-row-button ${
              theme === 'dark' && 'intro-row-button-dark'
            }`}
            onClick={() => setModalIsOpen(true)}
          >
            Edit details
          </button>
          <form className='modal-form' onSubmit={handleSubmit}>
            <Modal
              preventScroll={true}
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={modalStyle}
              ariaHideApp={false}
            >
              <div className='modal-container'>
                <div className='modal-header'>
                  <div className='modal-heading'>Edit Details</div>
                  <div className='modal-header-close'>
                    <Cancel
                      className='modal-header-close-icon'
                      onClick={() => {
                        setModalIsOpen(false);
                        setEdit(false);
                      }}
                    />
                  </div>
                </div>
                <div className='modal-intro'>
                  <div className='modal-intro-heading'>
                    Customise your Intro
                  </div>
                  <div className='modal-intro-description'>
                    Details that you select will be public and won't be posted
                    to News Feed.
                  </div>
                </div>
                <div className='modal-row'>
                  <div className='modal-row-heading'>Work</div>
                  <div className='modal-row-item' onClick={() => setEdit(true)}>
                    {!edit ? (
                      <>
                        <Add />
                        <div className='modal-row-description'>
                          Add a workplace
                        </div>
                      </>
                    ) : (
                      <div className='modal-row-input-container'>
                        <input
                          placeholder='Company'
                          required
                          name='company'
                          onChange={onChange}
                          className='modal-row-input'
                          defaultValue={company}
                        />
                        <input
                          placeholder='Title'
                          required
                          name='title'
                          className='modal-row-input'
                          onChange={onChange}
                          defaultValue={title}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className='modal-row'>
                  <div className='modal-row-heading'>Education</div>
                  <div className='modal-row-item' onClick={() => setEdit(true)}>
                    {!edit ? (
                      <>
                        <Add />
                        <div className='modal-row-description'>
                          Add a high school
                        </div>
                      </>
                    ) : (
                      <div className='modal-row-input-container'>
                        <input
                          placeholder='High School'
                          required
                          name='highSchool'
                          onChange={onChange}
                          className='modal-row-input'
                          defaultValue={highSchool}
                        />
                      </div>
                    )}
                  </div>
                  <div className='modal-row-item' onClick={() => setEdit(true)}>
                    {!edit ? (
                      <>
                        <Add />
                        <div className='modal-row-description'>
                          Add a university
                        </div>
                      </>
                    ) : (
                      <div className='modal-row-input-container'>
                        <input
                          placeholder='University'
                          required
                          name='university'
                          className='modal-row-input'
                          onChange={onChange}
                          defaultValue={university}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className='modal-row'>
                  <div className='modal-row-heading'>Current town/city</div>
                  <div className='modal-row-item' onClick={() => setEdit(true)}>
                    {!edit ? (
                      <>
                        <Add />
                        <div className='modal-row-description'>Add city</div>
                      </>
                    ) : (
                      <div className='modal-row-input-container'>
                        <input
                          placeholder='City'
                          required
                          name='lives'
                          className='modal-row-input'
                          onChange={onChange}
                          defaultValue={lives}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className='modal-row'>
                  <div className='modal-row-heading'>Home Town</div>
                  <div className='modal-row-item' onClick={() => setEdit(true)}>
                    {!edit ? (
                      <>
                        <Add />
                        <div className='modal-row-description'>
                          Add home town
                        </div>
                      </>
                    ) : (
                      <div className='modal-row-input-container'>
                        <input
                          placeholder='Home Town'
                          required
                          name='from'
                          className='modal-row-input'
                          onChange={onChange}
                          defaultValue={from}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='modal-submit'>
                <div
                  className='modal-submit-text'
                  onClick={() => setEdit(true)}
                >
                  Update your information
                </div>
                <button
                  className='modal-submit-cancel'
                  onClick={() => {
                    setModalIsOpen(false);
                    setEdit(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className='modal-submit-submit'
                  type='submit'
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </Modal>
          </form>
        </div>
      )}
    </div>
  );
};

export default Intro;
