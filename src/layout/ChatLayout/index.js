import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Chat from 'features/Chat';
import NotFoundPage from 'components/NotFoundPage';
import Friend from 'features/Friend';
import { Col, Row } from 'antd';
import HeaderChatContainer from 'features/Chat/containers/HeaderChatContainer';
import NavbarContainer from 'features/Chat/containers/NavbarContainer';
import { fetchListRequestFriend } from 'features/Friend/friendSlice';
import { useDispatch } from 'react-redux';

function ChatLayout(props) {
    const { url } = useRouteMatch();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchListRequestFriend());
    }, []);

    return (
        <div>
            <Row gutter={[0, 0]}>
                <Col span={1}>
                    <NavbarContainer />
                </Col>
                <Col span={23}>
                    <Switch>
                        <Route exact path={url} component={Chat} />
                        <Route
                            exact
                            path={`${url}/friends`}
                            component={Friend}
                        />

                        <Route component={NotFoundPage} />
                    </Switch>
                </Col>
            </Row>
        </div>
    );
}

export default ChatLayout;
