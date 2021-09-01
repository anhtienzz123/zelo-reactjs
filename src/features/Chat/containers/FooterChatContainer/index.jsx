import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NavigationChatBox from 'features/Chat/components/NavigationChatBox';
import { LikeFilled, LikeOutlined, LikeTwoTone, SmileOutlined } from '@ant-design/icons';
import './style.scss';
import TextEditor from 'features/Chat/components/TextEditor';
FooterChatContainer.propTypes = {

};



const style_EditorText = {
    flexDirection: "column",
}



const style_addtion_interaction = {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
}


function FooterChatContainer(props) {
    const [showTextFormat, setShowTextFormat] = useState(false);


    const handleClickTextFormat = () => {
        setShowTextFormat(!showTextFormat);
    }
    return (
        <div id='main-footer-chat'>
            <div className="navigation">
                <NavigationChatBox
                    onClickTextFormat={handleClickTextFormat}
                />
            </div>

            <div
                className="chat-editor"
                style={showTextFormat ? style_EditorText : undefined}


            >
                <div className="main-editor" >
                    <TextEditor showTextFormat={showTextFormat} />
                </div>

                <div
                    className="addtion-interaction"
                    style={showTextFormat ? style_addtion_interaction : undefined}
                >

                    <div className="emoji-or-stiker">
                        <SmileOutlined />
                    </div>

                    <div className="like-emoji">
                        <LikeTwoTone twoToneColor='#faad14' />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FooterChatContainer;