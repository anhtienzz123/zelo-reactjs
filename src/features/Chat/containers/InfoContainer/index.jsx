import AnotherSetting from 'features/Chat/components/AnotherSetting';
import ArchiveFile from 'features/Chat/components/ArchiveFile';
import ArchiveMedia from 'features/Chat/components/ArchiveMedia';
import InfoFriendSearch from 'features/Chat/components/InfoFriendSearch';
import InfoMediaSearch from 'features/Chat/components/InfoMediaSearch';
import InfoMember from 'features/Chat/components/InfoMember';
import InfoNameAndThumbnail from 'features/Chat/components/InfoNameAndThumbnail';
import InfoTitle from 'features/Chat/components/InfoTitle';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';
InfoContainer.propTypes = {
    socket: PropTypes.object,
};

InfoContainer.defaultProps = {
    socket: {}
}

function InfoContainer({ socket }) {

    const [isFind, setFind] = useState(0);
    const { memberInConversation, type } = useSelector(state => state.chat);


    const handleViewMemberClick = (value) => {
        setFind(value);
    }

    const handleViewMediaClick = (value) => {
        setFind(value);
    }

    const handleOnBack = (value) => {
        setFind(value);
    }
    return (



        <div id='main-info'>
            {
                (() => {
                    if (isFind === 0) {
                        return (<>



                            <div className="info_title-wrapper">
                                <InfoTitle
                                    onBack={handleOnBack}
                                    text="Thông tin nhóm"
                                />
                            </div>
                            <Scrollbars
                                autoHide={true}
                                autoHideTimeout={1000}
                                autoHideDuration={200}
                                style={{ width: '100%', height: 'calc(100vh - 68px)' }}


                            >

                                <div className="body-info">
                                    <div className="info_name-and-thumbnail-wrapper">
                                        <InfoNameAndThumbnail />
                                    </div>

                                    {type && (
                                        <div className="info_member-wrapper">
                                            <InfoMember
                                                viewMemberClick={handleViewMemberClick}
                                                quantity={memberInConversation.length}
                                            />
                                        </div>
                                    )}

                                    <div className='info_archive-media-wrapper'>
                                        <ArchiveMedia viewMediaClick={handleViewMediaClick} />
                                    </div>

                                    <div className='info_archive-file-wrapper'>
                                        <ArchiveFile viewMediaClick={handleViewMediaClick} />
                                    </div>

                                    <div className='info_another-setting-wrapper'>
                                        <AnotherSetting
                                            socket={socket}
                                        />
                                    </div>


                                </div>

                            </Scrollbars>

                        </>)
                    } else if (isFind === 2) {
                        return (
                            <InfoMediaSearch
                                onBack={handleOnBack}

                            />
                        )
                    } else {
                        return (
                            <InfoFriendSearch
                                onBack={handleOnBack}
                                members={memberInConversation}
                            />
                        )
                    }
                })()


            }

        </div>
        // </Scrollbars >

    );
}

export default InfoContainer;