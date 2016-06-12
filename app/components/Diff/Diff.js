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

const whitelist = [
	'aboard',
	'about',
	'above',
	'across',
	'after',
	'against',
	'along',
	'amid',
	'among',
	'anti',
	'around',
	'as',
	'at',
	'before',
	'behind',
	'below',
	'beneath',
	'beside',
	'besides',
	'between',
	'beyond',
	'but',
	'by',
	'concerning',
	'considering',
	'despite',
	'down',
	'during',
	'except',
	'excepting',
	'excluding',
	'following',
	'for',
	'from',
	'in',
	'inside',
	'into',
	'like',
	'minus',
	'near',
	'of',
	'off',
	'on',
	'onto',
	'opposite',
	'outside',
	'over',
	'past',
	'per',
	'plus',
	'regarding',
	'round',
	'save',
	'since',
	'than',
	'through',
	'to',
	'toward',
	'towards',
	'under',
	'underneath',
	'unlike',
	'until',
	'up',
	'upon',
	'versus',
	'via',
	'with',
	'within',
	'without',
]

const test = (part) => {
	console.log(part);
	return true;
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
						[`${styles.added}`]: (part.added && whitelist.indexOf(part.value.trim()) != -1),
						[`${styles.removed}`]: (part.removed && whitelist.indexOf(part.value.trim()) != -1)
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