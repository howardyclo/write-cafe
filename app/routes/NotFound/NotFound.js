import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './NotFound.scss';

class NotFound extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return ( 
			<div>
				Not Found
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}

export default connect(mapStateToProps)(NotFound);
