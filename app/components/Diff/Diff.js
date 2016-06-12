import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Diff.scss';

const jsdiff = require('diff');

const fnMap = {
	'chars': jsdiff.diffChars,
	'words': jsdiff.diffWords,
	'sentences': jsdiff.diffSentences,
	'json': jsdiff.diffJson
}

export default class Diff extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		const {
			inputA,
			inputB, 
			type 
		} = this.props;

		const diff = fnMap[type](inputA, inputB);

		return (
			<span>
				{diff.map((part, index) => (
					<span key={index} className={classnames({
						[`${styles.added}`]: part.added,
						[`${styles.removed}`]: part.removed
					})}>
						{part.value}
					</span>
				))}
			</span>
		)
	}
}

Diff.defaultProps = {
	inputA: '',
	inputB: '',
	type: 'chars'
}

Diff.propTyes = {
	inputA: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	inputB: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	type: React.PropTypes.oneOf([
		'chars',
		'words',
		'sentences',
		'json'
    ])
}