import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import styles from './Navbar.scss';

export default class Navbar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav className={classnames("navbar navbar-inverse", styles.navbar)}>
				<div className="contain-fluid">
					<div className="navbar-header">
						<a className="navbar-brand">Write Café</a>
					</div>
				</div>
			</nav>
		)
	}
}
