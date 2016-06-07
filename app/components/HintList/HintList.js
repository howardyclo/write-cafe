import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './HintList.scss';

export default class HintList extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return ( 
			<div className={styles.container}>
				<div className={styles.header}>Hints for you</div>
			</div>
		)
	}
}