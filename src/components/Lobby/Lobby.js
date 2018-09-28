import React from 'react';
import { connect } from 'react-redux';

import Rooms from './Rooms';
import Chat from './Chat';
import sendMessage from '../../redux/actions/sendMessage';
import { insertMessageGeneralChat } from '../../redux/actions/chatActions';
import './lobby.scss';

const Lobby = ({ user, messages, insertMessageGeneralChat }) => (
	<div className="lobby">
		<Rooms />
		<Chat
			user={user}
			messages={messages}
			sendMessage={sendMessage}
			insertMessageChat={insertMessageGeneralChat}/>
	</div>
);

const matStateToProps = (state) => ({
    user: state.user.data,
    messages: state.chat.messages
});

export default connect(matStateToProps, {
    insertMessageGeneralChat
})(Lobby);
  