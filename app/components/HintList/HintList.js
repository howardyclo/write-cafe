import React, { Component } from 'react';
import Diff from '../Diff/Diff';
import classnames from 'classnames';
import styles from './HintList.scss';

class Hint extends Component {

	constructor(props) {
		super(props);

		this.state = {
			exampleVisibility: Array(props.candidates.length).fill(false)
		}
	}

	sum = (candidates) => {
		return candidates.reduce((sum, candidate) => sum + candidate.count, 0)
	}

	showExamples = (index) => {

		const exampleVisibility = Object.assign([], this.state.exampleVisibility);

		exampleVisibility[index] = true;

		this.setState({
			exampleVisibility: exampleVisibility
		});
	}

	hideExamples = (index) => {

		const exampleVisibility = Object.assign([], this.state.exampleVisibility);

		exampleVisibility[index] = false;

		this.setState({
			exampleVisibility: exampleVisibility
		});
	}

	render() {

		const { entity, candidates } = this.props;
		const { exampleVisibility } = this.state;
		const sum = this.sum(candidates);

		return (
			<div className={styles.hint}>
				{candidates.map((candidate, index) => (
					<div className={styles.candidate}>
						<div>
							{
								(exampleVisibility[index]) 
									? <i className={classnames("fa fa-angle-up", styles.angle)} aria-hidden="true" onClick={() => this.hideExamples(index)}></i>
									: <i className={classnames("fa fa-angle-down", styles.angle)} aria-hidden="true" onClick={() => this.showExamples(index)}></i>
							}
							<Diff key={index} inputA={entity} inputB={candidate.sentence} type="words" />
							<span className={styles.percentage}>{Math.round(100 * (candidate.count / sum))}%</span>
						</div>
						{
							(exampleVisibility[index])
								? <ul className={styles.examples}>{candidate.examples.map((example, index) => <li key={index}>{example}</li>)}</ul>
								: null
						}
					</div>
				))}
			</div>
		)
	}
}

export default class HintList extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		const { correction = {} } = this.props;

		return ( 
			<div className={styles.container}>
				<div className={styles.header}>Hints for you</div>
				{Object.keys(correction).map((entity, index) => (
					<Hint 
						key={index}
						entity={entity}
						candidates={correction[entity]} />
				))}
			</div>
		)
	}
}