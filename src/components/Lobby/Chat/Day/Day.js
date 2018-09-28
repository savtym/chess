import React from 'react';
import moment from 'moment';

import './Day.scss';

const Day = ({ day }) => (
	<div className="one_day">{moment.unix(day).format('dddd, MMMM Do YYYY')}</div>
);

export default Day;
