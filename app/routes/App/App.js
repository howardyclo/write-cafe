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

		const { status } = this.props;

		return (
			<div className={styles.container}>
				<Navbar status={status} />
				{this.props.children}
			</div>
		)
	}
}

const mapStateToProps = (state) => {

	const { grammarCorrecter } = state;
	const { status } = grammarCorrecter;

	return { status };
}

export default connect(mapStateToProps)(App);