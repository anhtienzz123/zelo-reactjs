import { Spin } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RegistryPage from './pages/RegistryPage';
import ForgotPage from './pages/ForgotPage';
import LoginPage from './pages/LoginPage';
import ConfirmOTPPage from './pages/ConfirmOTPPage';
import ConfirmAccountPage from './pages/ConfirmAccountPage';

function Account(props) {
    const { url } = useRouteMatch();

    const { isLoading } = useSelector((state) => state.account);

    return (
        <Spin spinning={isLoading}>
            <Switch>
                <Route path={`${url}/login`} component={LoginPage} />
                <Route path={`${url}/registry`} component={RegistryPage} />
                <Route path={`${url}/forgot`} component={ForgotPage} />
                <Route path={`${url}/otp`} component={ConfirmOTPPage} />
                <Route path={`${url}/confirm`} component={ConfirmAccountPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </Spin>
    );
}

export default Account;
