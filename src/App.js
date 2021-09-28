import NotFoundPage from 'components/NotFoundPage';
import ProtectedRoute from 'components/ProtectedRoute';
import Account from 'features/Account';
import CallVideo from 'features/CallVideo';
import Home from 'features/Home';
import AdminLayout from 'layout/AdminLayout';
import ChatLayout from 'layout/ChatLayout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/App.scss';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Switch>
                    <Route exact path='/' component={Home} />

                    <ProtectedRoute path='/chat' component={ChatLayout} />
                    <ProtectedRoute
                        path='/call-video/:conversationId'
                        component={CallVideo}
                    />
                    <ProtectedRoute
                        exact
                        path='/admin'
                        component={AdminLayout}
                    />

                    <Route path='/account' component={Account} />

                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
