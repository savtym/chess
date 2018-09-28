import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

import signIn from '../../redux/actions/signin';
import route from '../../redux/actions/route';

import './signin.scss';
import Loading from '../Loading';

class Signin extends React.Component {
	state = {
		email: '',
		password: '',
	};

	handleChangeEmail = ({ target }) => this.setState({ email: target.value });
	handleChangePassword = ({ target }) => this.setState({ password: target.value });

	render() {
		const { email, password } = this.state;
		return (
			<div className="signin">
				<form>
					<h3>Sing in</h3>

					<FormControl
						type="text"
						value={email}
						placeholder="email"
						className="signin__credentials"
						onChange={this.handleChangeEmail}
					/>

					<FormControl
						value={password}
						type="password"
						placeholder="password"
						className="signin__credentials"
						onChange={this.handleChangePassword}
					/>

					<div className="signin__bottom">
						<Button
							type="submit"
							bsStyle="success"
							className="signin__bottom__button"
							disabled={
								this.props.isLoading ||
								!email ||
								!password
							}
							onClick={() => this.props.signIn(this.state)}
						>
							Sign in
						</Button>
					</div>

					<div className="center">
						<a href="#">Lost you password?</a>
					</div>

					<div className="center">
						<a href="#" onClick={() => this.props.route('signup')}>Registration</a>
					</div>

					<Loading className="signin__spinner" isShow={this.props.isLoading}/>
					{this.props.error && <div className="signin__error">Some error was occurred! </div>}
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.signin.loading,
	loaded: state.signin.loaded,
	data: state.user.data,
	error: state.signin.error
});

const mapDispatchToProps = (dispatch) => ({
	signIn: (payload) => signIn(dispatch, payload),
	route: (payload) => route(dispatch, payload)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);