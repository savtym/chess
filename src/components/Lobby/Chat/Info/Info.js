import React from 'react';
import cx from 'classnames';

import './Info.scss';


const Info = ({ user, isConnected, isWatcher, isPlayer }) => (
	<div className={cx('change-user', { connected: isConnected })}>
		{isConnected ? 'Connected: ' : 'Disconnected: '}
		{isWatcher && 'watcher - '}
		{isPlayer && 'player - '}
		{user}
	</div>
);


Info.defaultProps = {
	isPlayer: false,
	isWatcher: false,
	isConnected: false,
};

export default Info;
