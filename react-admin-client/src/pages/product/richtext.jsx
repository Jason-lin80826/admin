import React, { Component } from 'react';
import { EditorState, convertToRaw ,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './richtext.css'
class ControlledEditor extends Component {
    constructor(props) {
        super(props);
        const html = this.props.detail
        console.log(html)
        if(html){
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
              const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
              const editorState = EditorState.createWithContent(contentState);
              this.state = {
                editorState,
              }
            }
        }else{
            this.state = {
                editorState: EditorState.createEmpty(),
              };
        }
    }  

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  componentDidMount(){
    //通过pros接收父组件传来的方法
    this.props.onRef2(this)
 }
  getDetails = ()=>{
     return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }
  render() {
    const { editorState } = this.state;
    return (
     <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}
export default ControlledEditor