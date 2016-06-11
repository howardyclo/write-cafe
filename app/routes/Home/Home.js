import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './Home.scss';

import { correct } from '../../redux/modules/grammarCorrecter/action';

import {
	HintList,
	Editor
} from '../../components';

class Home extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		const { 
			dispatch,
			correction
		} = this.props;

		return ( 
			<div className={styles.container}>
				<div className="row">
					<div className="col-md-8"> 
						<Editor 
							correct={(blockKey, sentence, handleSuccess, handleError) => dispatch(correct(blockKey, sentence, handleSuccess, handleError))}
							correction={correction} />
					</div>
					<div className="col-md-4">
						<HintList correction={correction} />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {

	const { grammarCorrecter } = state;
	const { correction } = grammarCorrecter;

	return { correction };
}

export default connect(mapStateToProps)(Home);
