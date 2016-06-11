import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import styles from './Navbar.scss';

export class StatusButton extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		const { status } = this.props;

		const statusButtonStyles = {
			request: {
				background: '#FFCA3B'
			},
			success: {
				background: '#38B87C'
			},
			error: {
				background: '#D93E59'
			}
		}

		return (
			<button 
				className={classnames("btn", styles.checkGrammar)} 
				style={statusButtonStyles[status.type]}>
				{status.message}
			</button>
		)
	}
}

export default class Navbar extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		const { status } = this.props;

		return (
			<nav className={classnames("navbar navbar-inverse", styles.navbar)}>
				<div className="contain-fluid">
					<div className="navbar-header">
						<a className="navbar-brand">Write Café</a>
					</div>
					<div className="navbar-form navbar-right" style={{'marginRight': '0px'}}>
						<StatusButton status={status} />
					</div>
				</div>
			</nav>
		)
	}
}
