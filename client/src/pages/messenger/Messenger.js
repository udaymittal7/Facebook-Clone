import './messenger.css';
import Header from '../../components/header/Header';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import ChatUser from '../../components/chatUser/ChatUser';
import { useEffect, useRef, useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import VideocamIcon from '@material-ui/icons/Videocam';
import CallIcon from '@material-ui/icons/Call';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import { Avatar } from '@material-ui/core';
import axios from 'axios';
import SocketIoClient from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Messenger = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const theme = localStorage.getItem('theme');

  const user = useSelector((state) => state.auth.user);

  const history = useHistory();

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = SocketIoClient();
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit('addUser', user._id);
    if (currentChat?.members.includes(user._id)) {
      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
      receiverId && socket.current.emit('addUser', receiverId);
    }
  }, [user, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get('/api/conversations/' + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('/api/messages/' + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post('/api/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentChat) {
      const getReceiver = async () => {
        try {
          const receiverId = currentChat.members.find(
            (member) => member !== user._id
          );
          const res = await axios.get(`/api/user/${receiverId}`);
          setReceiver(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getReceiver();
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Header />
      <div className={`messenger ${theme === 'dark' && 'messenger-dark'}`}>
        <div className={`chatMenu ${theme === 'dark' && 'chatMenu-dark'}`}>
          <div className="chatMenuWrapper">
            <div className="chatMenuHeader">
              <div className="chatMenuHeading">Chats</div>
              <div
                className={`chatMenuHeaderIcon ${
                  theme === 'dark' && 'chatMenuHeaderIcon-dark'
                }`}
              >
                <MoreHorizIcon />
              </div>
              <div
                className={`chatMenuHeaderIcon ${
                  theme === 'dark' && 'chatMenuHeaderIcon-dark'
                }`}
              >
                <VideoCallIcon />
              </div>
            </div>
            <div
              className={`chatMenuInput ${
                theme === 'dark' && 'chatMenuInput-dark'
              }`}
            >
              <SearchIcon color="disabled" />
              <input placeholder="Search Messenger" />
            </div>
            {conversations &&
              conversations.map((c) => (
                <div
                  key={c._id}
                  onClick={() => setCurrentChat(c)}
                  className={`chatMenuConversation ${
                    theme === 'dark' && 'chatMenuConversation-dark'
                  }`}
                >
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
          </div>
        </div>
        <div className={`chatBox ${theme === 'dark' && 'chatBox-dark'}`}>
          {currentChat ? (
            <div className="chatBoxMiddleContainer">
              <div className="chatBoxHeader">
                <div
                  className="chatBoxHeaderLeft"
                  onClick={() => history.push(`/profile/${receiver._id}`)}
                >
                  <Avatar
                    className="chatBoxHeaderPicture"
                    alt=""
                    src={
                      receiver && receiver.profilePicture
                        ? PF + receiver.profilePicture
                        : 'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg'
                    }
                  />
                  <span className="chatBoxHeaderName">
                    {receiver?.firstName + ' ' + receiver?.lastName}
                  </span>
                </div>
                <div className="chatBoxHeaderRight">
                  <div className="chatBoxHeaderIcon">
                    <CallIcon />
                  </div>
                  <div className="chatBoxHeaderIcon">
                    <VideocamIcon />
                  </div>
                  <div className="chatBoxHeaderIcon">
                    <InfoIcon />
                  </div>
                </div>
              </div>

              <div className="chatBoxMessages">
                {messages.map((m) => (
                  <div ref={scrollRef} key={m._id}>
                    <Message message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </div>

              <div
                className={`chatMessageInput ${
                  theme === 'dark' && 'chatMessageInput-dark'
                }`}
              >
                <input
                  placeholder="Aa"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                />
                <button
                  className={`chatSubmitButton ${
                    theme === 'dark' && 'chatSubmitButton-dark'
                  }`}
                  onClick={handleSubmit}
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          ) : (
            <div className="noConversationText">
              Open a conversation to start a chat.
            </div>
          )}
        </div>
        <div className="chatUser">
          {currentChat && (
            <ChatUser
              picture={receiver?.profilePicture}
              name={receiver?.firstName + ' ' + receiver?.lastName}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Messenger;
