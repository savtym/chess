import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

import signUp from '../../redux/actions/signup';
import route from '../../redux/actions/route';

import './signup.scss';

import Loading from '../Loading';


class Signup extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
		repeat_password: '',
	};


	handleChangeUsername = ({ target }) => this.setState({ username: target.value });
	handleChangeEmail = ({ target }) => this.setState({ email: target.value });
	handleChangePassword = ({ target }) => this.setState({ password: target.value });
	handleChangeConfirmPass = ({ target }) => this.setState({ repeat_password: target.value });

	render() {
		return (
			<div className="signup">
				<form>
					<h3>Sign up</h3>

					<FormControl
						className="signup__credentials"
						value={this.state.username}
						placeholder={'Username'}
						onChange={this.handleChangeUsername}
					/>

					<FormControl
						className="signup__credentials"
						value={this.state.email}
						placeholder={'Email'}
						onChange={this.handleChangeEmail}
					/>

					<FormControl
						className="signup__credentials"
						type="password"
						value={this.state.password}
						placeholder={'Password'}
						onChange={this.handleChangePassword}
					/>

					<FormControl
						className="signup__credentials"
						type="password"
						value={this.state.repeat_password}
						placeholder={'Confirm password'}
						onChange={this.handleChangeConfirmPass}
					/>

					<div className="signup__bottom">
						<Button
							bsStyle="success"
							type="submit"
							className="signup__signup"
							disabled={
								this.props.isLoading ||
								!this.state.username ||
								!this.state.email ||
								!this.state.password ||
								(this.state.password !== this.state.repeat_password)
							}
							onClick={() => this.props.signUp(this.state)}
						>Sign up</Button>

						<Button
							bsStyle="warning"
							className="signup__cencel"
							onClick={() => this.props.route('signin')}
						>Cancel</Button>
					</div>

					<Loading className="signup__spinner" isShow={this.props.isLoading}/>
					{this.props.error && <div className="signup__error">Some error was occurred! </div>}
					{/* {this.props.loaded && this.props.data && console.log(`Data: ${JSON.stringify(this.props.data)}`)} */}
					{/* {this.props.loaded && this.props.error && console.log(`Error: ${this.props.error}`)} */}
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.signup.loading,
	loaded: state.signup.loaded,
	data: state.user.data,
	error: state.signup.error
});

const mapDispatchToProps = (dispatch) => ({
	signUp: (payload) => signUp(dispatch, payload),
	route: (payload) => route(dispatch, payload)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);