// @flow

import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

type Props = {
	/** on Submit callback `({ login: string, secret: string, }) => void` */
	onSubmit?: ({ login: string, secret: string, }) => void,
};

/**
 * Example of an unmanaged form and third party dom manipulation lib integration
 *
 * @type {PureComponent}
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
				<Card elevation={1}>
					<CardContent>
						<Typography component='h1' gutterBottom variant='h5'>
							Authentification
						</Typography>
						<Typography gutterBottom variant='subtitle1'>
							Please enter your credentials
						</Typography>
						<TextField
							inputRef={this.handleLoginFieldRef}
							placeholder='Login name' />
						<br />
						<TextField
							inputRef={this.handlePasswordFieldRef}
							placeholder='Password'
							type='password' />
					</CardContent>
					<CardActions
						style={{
							textAlign: 'right',
						}}>
						<Button>Cancel</Button>
						<Button color='primary' onPointerUp={this.onSubmit}>Submit</Button>
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
			login: this.loginField.value,
			secret: this.passwordField.value,
		};

		this.loginField.value = '';
		this.passwordField.value = '';

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
		if (!r) return;
		r.removeEventListener('keyup', this.handleKeyUpForLoginField);
		r.addEventListener('keyup', this.handleKeyUpForLoginField);
	}

	handlePasswordFieldRef = (r: ?TextField) => {
		this.passwordField = r;
		if (!r) return;
		r.removeEventListener('keyup', this.handleKeyUpForPasswordField);
		r.addEventListener('keyup', this.handleKeyUpForPasswordField);
	}
}

export default SignInView;
