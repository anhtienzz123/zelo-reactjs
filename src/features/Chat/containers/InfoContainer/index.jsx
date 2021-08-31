import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import ArchiveFile from 'features/Chat/components/ArchiveFile';
import ArchiveMedia from 'features/Chat/components/ArchiveMedia';
import InfoMember from 'features/Chat/components/InfoMember';
import InfoNameAndThumbnail from 'features/Chat/components/InfoNameAndThumbnail';
import InfoTitle from 'features/Chat/components/InfoTitle';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import './style.scss';
InfoContainer.propTypes = {

};

function InfoContainer(props) {

    return (

        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            style={{ width: '100%', minHeight: '100vh' }}


        >

            <div id='main-info'>
                <div className="info_title-wrapper">
                    <InfoTitle isGroup={false} />
                </div>

                <div className="info_name-and-thumbnail-wrapper">
                    <InfoNameAndThumbnail />
                </div>

                <div className="info_member-wrapper">
                    <InfoMember />

                </div>

                <div className='info_archive-media-wrapper'>
                    <ArchiveMedia />
                </div>

                <div className='info_archive-file-wrapper'>
                    <ArchiveFile />
                </div>


            </div>
        </Scrollbars>

    );
}

export default InfoContainer;