import { Spin } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import EmailRegistryPage from './pages/EmailRegistryPage';
import ForgotPage from './pages/ForgotPage';
import LoginPage from './pages/LoginPage';
import PhoneRegistryPage from './pages/PhoneRegistryPage';

function Account(props) {
    const { url } = useRouteMatch();

    const { isLoading } = useSelector((state) => state.account);

    return (
        <Spin spinning={isLoading}>
            <Switch>
                <Route path={`${url}/login`} component={LoginPage} />
                <Route
                    path={`${url}/registry/email`}
                    component={EmailRegistryPage}
                />
                <Route
                    path={`${url}/registry/phone`}
                    component={PhoneRegistryPage}
                />
                <Route path={`${url}/forgot`} component={ForgotPage} />

                <Route component={NotFoundPage} />
            </Switch>
        </Spin>
    );
}

export default Account;
