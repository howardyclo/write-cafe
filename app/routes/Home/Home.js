import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './Home.scss';

import {
	HintList,
	Editor
} from '../../components';

class Home extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return ( 
			<div className={styles.container}>
				<div className="row">
					<div className="col-md-8"> 
						<Editor />
					</div>
					<div className="col-md-4">
						<HintList />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}

export default connect(mapStateToProps)(Home);
