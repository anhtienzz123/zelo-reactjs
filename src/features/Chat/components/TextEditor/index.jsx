import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Scrollbars from 'react-custom-scrollbars';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

TextEditor.propTypes = {
    showTextFormat: PropTypes.bool,
};

TextEditor.propTypes = {
    showTextFormat: null,
};

function TextEditor(props) {
    const { showTextFormat } = props;
    const [value, setValue] = useState('');

    console.log(value);

    const formats = [
        [{ 'header': '1' }, { 'header': '2' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['image', 'video'],
        ['clean']
    ];

    const handleFocus = (range, source, editor) => {

    }

    const handleOnBlur = (previousRange, source, editor) => {

    }




    const style_MainEditor = {
        minHeight: "122px",
    }

    return (

        <div
            id='text-editor'
            style={showTextFormat ? style_MainEditor : undefined}

        >
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder='Nhập @, tin nhắn tới Phúc'
                onFocus={handleFocus}
                onBlur={handleOnBlur}
                modules={{ toolbar: (showTextFormat ? formats : false) }}
                formats={formats}
                style={{ border: 'none', outline: 'none' }}

            />
        </div>









    );
}

export default TextEditor;