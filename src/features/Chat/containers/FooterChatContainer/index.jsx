import React from 'react';
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



const style_addtion_interactiont = {
    flex: 1,
    boxShadow: '0 -5px 3px -3px rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
    width: '100%',
}


function FooterChatContainer(props) {
    return (
        <div id='main-footer-chat'>
            <div className="navigation">
                <NavigationChatBox />
            </div>

            <div
                className="chat-editor"
            // style={style_EditorText}
            >
                <div className="main-editor" >
                    <TextEditor />
                </div>

                <div
                    className="addtion-interaction"
                // style={style_addtion_interactiont}
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