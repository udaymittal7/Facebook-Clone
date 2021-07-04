import './messenger.css';
import Header from '../../components/header/Header';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatUser/ChatUser';
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

const Messenger = () => {
  const user = useSelector((state) => state.auth.user);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
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
  }, [user]);

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
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Header />
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <div className='chatMenuHeader'>
              <div className='chatMenuHeading'>Chats</div>
              <div className='chatMenuHeaderIcon'>
                <MoreHorizIcon />
              </div>
              <div className='chatMenuHeaderIcon'>
                <VideoCallIcon />
              </div>
            </div>
            <div className='chatMenuInput'>
              <SearchIcon color='disabled' />
              <input placeholder='Search Messenger' />
            </div>
            {conversations &&
              conversations.map((c) => (
                <div
                  onClick={() => setCurrentChat(c)}
                  className='chatMenuConversation'
                >
                  <Conversation
                    conversation={c}
                    currentUser={user}
                    key={c._id}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className='chatBox'>
          {currentChat ? (
            <div>
              <div className='chatBoxHeader'>
                <div className='chatBoxHeaderLeft'>
                  <Avatar className='chatBoxHeaderPicture' alt='' />
                  <span className='chatBoxHeaderName'>Uday Mittal</span>
                </div>
                <div className='chatBoxHeaderRight'>
                  <div className='chatBoxHeaderIcon'>
                    <CallIcon />
                  </div>
                  <div className='chatBoxHeaderIcon'>
                    <VideocamIcon />
                  </div>
                  <div className='chatBoxHeaderIcon'>
                    <InfoIcon />
                  </div>
                </div>
              </div>

              <div className='chatBoxMessages'>
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message
                      message={m}
                      own={m.sender === user._id}
                      key={m._id}
                    />
                  </div>
                ))}
              </div>
              <div className='chatMessageInput'>
                <input placeholder='Aa' />
                <button className='chatSubmitButton' onClick={handleSubmit}>
                  <SendIcon />
                </button>
              </div>
            </div>
          ) : (
            <div className='noConversationText'>
              Open a conversation to start a chat.
            </div>
          )}
        </div>
        <div className='chatUser'>
          <div className='chatUserWrapper'></div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
