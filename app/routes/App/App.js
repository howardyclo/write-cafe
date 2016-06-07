import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './App.scss';

import {
	Navbar
} from '../../components';

class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.container}>
				<Navbar />
				{this.props.children}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}

export default connect(mapStateToProps)(App);