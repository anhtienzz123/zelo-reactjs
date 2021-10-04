import { Spin } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import RegistryPage from './pages/RegistryPage';
import ForgotPage from './pages/ForgotPage';
import LoginPage from './pages/LoginPage';
import ConfirmAccountPage from './pages/ConfirmAccountPage';

function Account(props) {
    const { url } = useRouteMatch();
    const history = useHistory();
    const { isLoading } = useSelector((state) => state.account);
    const { user } = useSelector((state) => state.global);

    if (user) {
        if (user.isAdmin) history.push('/admin');
        else history.push('/chat');
    }

    return (
        <Spin spinning={isLoading}>
            <Switch>
                <Route path={`${url}/login`} component={LoginPage} />
                <Route path={`${url}/registry`} component={RegistryPage} />
                <Route path={`${url}/forgot`} component={ForgotPage} />
                <Route path={`${url}/confirm`} component={ConfirmAccountPage} />

                <Route component={NotFoundPage} />
            </Switch>
        </Spin>
    );
}

export default Account;
