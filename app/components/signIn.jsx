import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import $ from 'npm-zepto';


/**
 * Example of an unmanaged form and third party dom manipulation lib integration
 */
class SignInView extends PureComponent {
	static propTypes = {
		onSubmit: PropTypes.func,
	}

	static defaultProps = {
		onSubmit: () => {},
	}

	render() {
		return (
			<span
				style={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center',
					width: '100%',
				}}>
				<Card
					zDepth={1}>
					<CardHeader
						subtitle='Please enter your credentials'
						title='Authentification'/>
					<CardText>
						<TextField
							hintText='Login name'
							ref={this.handleLoginFieldRef}/>
						<br/>
						<TextField
							hintText='Password'
							ref={this.handlePasswordFieldRef}
							type='password'/>
					</CardText>
					<CardActions
						style={{
							textAlign: 'right',
						}}>
						<FlatButton label='Cancel' />
						<FlatButton label='Submit' onTouchTap={this.onSubmit} primary/>
					</CardActions>
				</Card>
			</span>
		);
	}

	onSubmit = (e) => {
		if (e && e.preventDefault) {
			e.stopPropagation();
			e.preventDefault();
		}

		if (!this.loginField || !this.passwordField) return;

		const payload = {
			login: this.loginField.input.value,
			secret: this.passwordField.input.value,
		};

		this.loginField.input.value = '';
		this.passwordField.input.value = '';

		this.loginField.focus();

		const { onSubmit } = this.props;
		onSubmit(payload);
	}

	handleKeyUpForLoginField = ({ keyIdentifier }) => {
		if (keyIdentifier !== 'Enter' || !this.passwordField) return;
		this.passwordField.focus();
	}

	handleKeyUpForPasswordField = ({ keyIdentifier }) => {
		if (keyIdentifier !== 'Enter') return;
		this.onSubmit();
	}

	handleLoginFieldRef = (r) => {
		this.loginField = r;
		if (!r || !r.input) return;
		$(r.input)
			.off('keyup', this.handleKeyUpForLoginField)
			.on('keyup', this.handleKeyUpForLoginField);
	}

	handlePasswordFieldRef = (r) => {
		this.passwordField = r;
		if (!r || !r.input) return;
		$(r.input)
			.off('keyup', this.handleKeyUpForPasswordField)
			.on('keyup', this.handleKeyUpForPasswordField);
	}
}

export default SignInView;
