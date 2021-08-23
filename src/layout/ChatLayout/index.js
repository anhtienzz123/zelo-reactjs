import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Chat from 'features/Chat';
import NotFoundPage from 'components/NotFoundPage';
import Friend from 'features/Friend';
import { Col, Row } from 'antd';
import HeaderChatContainer from 'features/Chat/containers/HeaderChatContainer';

function ChatLayout(props) {
    const { url } = useRouteMatch();

    return (
        <div>

            <Row gutter={[0, 0]}>
                <Col span={1} >
                    <HeaderChatContainer />
                </Col>
                <Col span={23} >
                    <Switch>
                        <Route exact path={url} component={Chat} />
                        <Route path={`${url}/friends`} component={Friend} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Col>



            </Row>


        </div>
    );
}

export default ChatLayout;
