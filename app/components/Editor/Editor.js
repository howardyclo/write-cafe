import React, { Component } from 'react';
import { Editor as DraftEditor, EditorState } from 'draft-js';
import classnames from 'classnames';
import styles from './Editor.scss';

export default class Editor extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			editor: null,
			editorState: EditorState.createEmpty()
		}
	}

	handleOnChange = (editorState) => {

		console.log(editorState.toJS());

		this.setState({ editorState });
	}

	handleBlur = (event, editable) => {
		// console.log('blur', event);
	}

	handleEditableInput = (event, editable) => {
		console.log('editableInput', event);
	}

	handleExternalInteraction = (event, editable) => {
		// console.log('externalInteraction', event);
	}

	handleFocus = (event, editable) => {
		// console.log('focus', event);
	}

	componentDidMount(props) {

		let { editor } = this.state;

		editor = new MediumEditor('#editor', this.props.options);
		editor.subscribe('blur', this.handleBlur);
		editor.subscribe('editableInput', this.handleEditableInput);
		editor.subscribe('externalInteraction', this.handleExternalInteraction);
		editor.subscribe('focus', this.handleFocus);
	}

	componentWillUnmount() {

		let { editor } = this.state;

		editor.unsubscribe('blur', this.handleBlur);
		editor.unsubscribe('editableInput', this.handleEditableInput);
		editor.unsubscribe('externalInteraction', this.handleExternalInteraction);
		editor.unsubscribe('focus', this.handleFocus);
		editor = null;
	}

	render() {

		// return (
		// 	<div id="editor" className={styles.editor}></div>
		// )
		
		const { editorState } = this.state; 
		
		return (
			<div className={styles.editor}>
				<DraftEditor editorState={editorState} onChange={this.handleOnChange} />
			</div>
		)
	}
}

Editor.defaultProps = {
	options: {
		targetBlank: true,
		autoLink: true,
		toolbar: {
	        buttons: [
	        	{
	        		name: 'bold',
	        		classList: [styles.button]
	        	},
	        	{
	        		name: 'italic',
	        		classList: [styles.button]
	        	},
	        	{
	        		name: 'quote',
	        		classList: [styles.button]
	        	},
	        	{
	        		name: 'anchor',
	        		classList: [styles.button]
	        	},
	        	{
	        		name: 'h2',
	        		classList: [styles.button]
	        	},
	        ]
	    },
		placeholder: {
			text: 'Write something ...',
    		hideOnClick: true
		}
	}
}




