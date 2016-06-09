import React, { Component } from 'react';
import Immutable from 'immutable';
import classnames from 'classnames';
import { 
	convertFromRaw,
	convertToRaw,
	convertFromHTML,
	ContentState,
	CompositeDecorator,
	Editor as DraftEditor,
	EditorState,
	Entity,
	Modifier,
	SelectionState,
} from 'draft-js';
import styles from './Editor.scss';

class Highlight extends Component {

	constructor(props) {
		super(props);

		this.state = {
			highlightStyle: {
				borderBottom: '2px solid #b6f9cd'
			}
		}
	}

	handleOnMouseOver = () => {
		this.setState({
			highlightStyle: { 
				background: '#b6f9cd',
				padding: '2px 0'
			}
		});
	}

	handleOnMouseOut = () => {
		this.setState({
			highlightStyle: { 
				borderBottom: '2px solid #b6f9cd'
			}
		});
	}

	render() {
		return (
			<span {...this.props} 
				style={this.state.highlightStyle} 
				onMouseOver={this.handleOnMouseOver}
				onMouseOut={this.handleOnMouseOut}>
				{this.props.children}
			</span>
		)
	}
}

const handleHighLightStrategy = (contentBlock, callback) => {
	// Execute callback if filter function (See if entity type is 'HIGHLIGHT') passes. 
	contentBlock.findEntityRanges((characterMetadata) => {

		const entityKey = characterMetadata.getEntity();

		if (!entityKey)
			return false;

		return Entity.get(entityKey).getType() === 'HIGHLIGHT'

	}, callback);
}

const decorator = new CompositeDecorator([{ 
	strategy: handleHighLightStrategy,
	component: Highlight
}]);

export default class Editor extends Component {

	constructor(props) {
		super(props);
				
		this.state = {
			autoCorrection: null,
			editorState: EditorState.createEmpty(decorator)
		}
	}

	beforeCorrect = () => {
		this.correct().then(correction => this.afterCorrect(correction));
	}

	correct = () => {

		const { editorState } = this.state;
		const currentBlockKey = editorState.getSelection().getAnchorKey();
		const currentBlock = editorState.getCurrentContent().getBlockForKey(currentBlockKey);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					blockKey: currentBlockKey,
					sentence: 'listening to music',
					entityRanges: {
						offset: 'I am listening music'.indexOf('listening'),
						length: 'listening music'.length,
						key: 'highlight'
					}
				});
			}, 2000);
		});
	}

	afterCorrect = (correction) => {

		const { editorState } = this.state;
		const contentState = editorState.getCurrentContent();

		// Specify highlight range of text in the block
		const targetRange = new SelectionState({
			anchorKey: correction.blockKey,
			anchorOffset: correction.entityRanges.offset,
			focusKey: correction.blockKey,
			focusOffset: correction.entityRanges.offset + correction.entityRanges.length
		});

		// Annotate ranges of text we specified above with metadata
		const entityKey = Entity.create(
			'HIGHLIGHT', 
			'MUTABLE', 
			{ correction }
		);

		// Apply the entity to the highlighted range 
		const contentStateWithHighlight = Modifier.applyEntity(
			contentState, 
			targetRange, 
			entityKey
		);
		
		// Create a new editorState with highlighted text
		const newEditorState = EditorState.push(
			editorState,
			contentStateWithHighlight,
			'apply-entity'
		);

		// Update editorState
		this.setState({ 
			editorState: newEditorState
		});

		console.log(convertToRaw(this.state.editorState.getCurrentContent()));
	}

	handleOnChange = (newEditorState) => {

		// Clear timeout
		if (this.state.autoCorrection) {
			clearTimeout(this.state.autoCorrection);
			this.setState({
				autoCorrection: null
			});
		}

		// Set timeout when content changed
		if (!Immutable.is(newEditorState.getCurrentContent(), this.state.editorState.getCurrentContent())) {
			this.setState({
				autoCorrection: setTimeout(this.beforeCorrect, 2000)
			});
		}

		// Update editorState
		this.setState({ 
			editorState: newEditorState
		});
	}

	render() {
		
		const { editorState } = this.state; 
		
		return (
			<div 
				className={styles.container} 
				onClick={() => this.refs.editor.focus()}>
				<DraftEditor 
					ref="editor"
					placeholder="Write something ..."
					editorState={editorState} 
					onChange={this.handleOnChange} />
			</div>
		)
	}
}



