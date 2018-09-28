import React from 'react';
import cx from 'classnames';
import moment from 'moment';

import './message.scss';

const Message = ({ className, isMine, author, time, message }) => (
	<div className={cx(className, { [`${className}__mine`]: isMine })}>
		<div className={`${className}__header`}>
			<h3 className={`${className}__author`}>{author}</h3>
			<p className={`${className}__time`}>{moment.unix(time).format('HH:mm:ss')}</p>
		</div>

		<div className={`${className}__content`}>
			{message}
		</div>
	</div>
);


Message.defaultProps = {
	isMine: false,
	className: 'message',
};

export default Message;