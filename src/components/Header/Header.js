import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import logOut from '../../redux/actions/logOut';

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
				<Button bsStyle="success" onClick={props.logOut}>Logout</Button>
			)}
		</div>
	</div>
);

const mapStateToProps = (state) => ({
	user: state.user.data
});

const mapDispatchToProps = (dispatch) => ({
	logOut: () => logOut(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);