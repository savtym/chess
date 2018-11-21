import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import logOut from '../../redux/actions/logOut';
import { getAllHistory } from '../../redux/actions/history';

import './header.scss';
import History from '../History';


class Header extends Component {

	state = {
		isOpenHistory: false,
	};

	onClickCloseHistory = () => {
		this.setState({
			isOpenHistory: false,
		});
	};

	onClickOpenHistory = () => {
		this.setState({
			isOpenHistory: true,
		});

		this.props.getAllHistory();
	};

	render() {
		const {
			user,
			logOut,
			allHistory,
		} = this.props;
		const { isOpenHistory } = this.state;

		return (
			<div className="header">
				<div className="header__description">Chess</div>
				<div className="header__right">
					{user && (
						<div className="header__right__username">
							<p>Username:</p>
							<h3>{user.username}</h3>
						</div>
					)}

					{user && (
						<React.Fragment>
							<Button bsStyle="info" onClick={this.onClickOpenHistory}>History</Button>
							<Button bsStyle="success" onClick={logOut}>Logout</Button>
						</React.Fragment>
					)}
				</div>

				<History
					history={allHistory}
					isOpen={isOpenHistory}
					onClose={this.onClickCloseHistory}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user.data,
	allHistory: state.history.allHistory,
});

const mapDispatchToProps = (dispatch) => ({
	logOut: () => logOut(dispatch),
	getAllHistory: () => dispatch(getAllHistory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);