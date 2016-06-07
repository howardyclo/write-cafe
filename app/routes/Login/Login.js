import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './Login.scss';

class Login extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return ( 
			<div>
				Login
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}

export default connect(mapStateToProps)(Login);
