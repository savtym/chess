import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import logOut from '../../redux/actions/logOut';
import { getAllHistory } from '../../redux/actions/history';

import './header.scss';

const Header = (props) => (
	<div className="header">
		<div className="header__description">Chess</div>
		<div className="header__right">
			{props.user && (
				<div className="header__right__username">
					<p>Username:</p>
					<h3>{props.user.username}</h3>
				</div>
			)}

			{props.user && (
				<React.Fragment>
					<Button bsStyle="info" onClick={props.getAllHistory}>History</Button>
					<Button bsStyle="success" onClick={props.logOut}>Logout</Button>
				</React.Fragment>
			)}
		</div>
	</div>
);

const mapStateToProps = (state) => ({
	user: state.user.data
});

const mapDispatchToProps = (dispatch) => ({
	logOut: () => logOut(dispatch),
	getAllHistory: () => dispatch(getAllHistory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);