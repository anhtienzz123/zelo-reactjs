import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Chat from 'features/Chat';
import NotFoundPage from 'components/NotFoundPage';
import Friend from 'features/Friend';

function ChatLayout(props) {
    const { url } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={url} component={Chat} />
                <Route path={`${url}/friends`} component={Friend} />

                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
}

export default ChatLayout;
