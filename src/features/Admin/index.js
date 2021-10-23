import { Layout } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AdminFooter from './components/AdminFooter';
import SiderBar from './components/SiderBar';
import StickerPage from './pages/StickerPage';
import StickerGroupPage from './pages/StickerGroupPage';
import UserPage from './pages/UserPage';
import './style.scss';

const { Header, Content } = Layout;

Admin.propTypes = {};

function Admin(props) {
    const { url } = useRouteMatch();
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <SiderBar />
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{ padding: 0 }}
                    />

                    <Content style={{ margin: '0 16px', background: 'white' }}>
                        <Switch>
                            <Route exact path={`${url}`} component={UserPage} />

                            <Route
                                exact
                                path={`${url}/stickers`}
                                component={StickerGroupPage}
                            />

                            <Route
                                path={`${url}/stickers/:id`}
                                component={StickerPage}
                            />

                            <Route component={NotFoundPage} />
                        </Switch>
                    </Content>

                    <AdminFooter />
                </Layout>
            </Layout>
        </div>
    );
}

export default Admin;
