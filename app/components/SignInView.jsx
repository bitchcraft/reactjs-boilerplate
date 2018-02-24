// @flow

import React, { PureComponent } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import $ from 'npm-zepto';

type Props = {
	/** on Submit callback `({ login: string, secret: string, }) => void` */
	onSubmit: ({ login: string, secret: string, }) => void,
};


/**
 * Example of an unmanaged form and third party dom manipulation lib integration
 */
class SignInView extends PureComponent<Props> {
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
						title='Authentification' />
					<CardText>
						<TextField
							ref={this.handleLoginFieldRef}
							hintText='Login name' />
						<br />
						<TextField
							ref={this.handlePasswordFieldRef}
							hintText='Password'
							type='password' />
					</CardText>
					<CardActions
						style={{
							textAlign: 'right',
						}}>
						<FlatButton label='Cancel' />
						<FlatButton label='Submit' onTouchTap={this.onSubmit} primary />
					</CardActions>
				</Card>
			</span>
		);
	}

	loginField: ?TextField
	passwordField: ?TextField

	onSubmit = (event?: SyntheticEvent<HTMLElement>) => {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
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

	handleKeyUpForLoginField = (event: KeyboardEvent) => {
		const { key } = event;
		if (key !== 'Enter' || !this.passwordField) return;
		this.passwordField.focus();
	}

	handleKeyUpForPasswordField = (event: KeyboardEvent) => {
		const { key } = event;
		if (key !== 'Enter') return;
		this.onSubmit();
	}

	handleLoginFieldRef = (r: ?TextField) => {
		this.loginField = r;
		if (!r || !r.input) return;
		$(r.input)
			.off('keyup', this.handleKeyUpForLoginField)
			.on('keyup', this.handleKeyUpForLoginField);
	}

	handlePasswordFieldRef = (r: ?TextField) => {
		this.passwordField = r;
		if (!r || !r.input) return;
		$(r.input)
			.off('keyup', this.handleKeyUpForPasswordField)
			.on('keyup', this.handleKeyUpForPasswordField);
	}
}

export default SignInView;
