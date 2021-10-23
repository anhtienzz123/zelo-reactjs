import { fetchUserProfile } from 'app/globalSlice';
import AdminProtectedRoute from 'components/AdminProtectedRoute';
import NotFoundPage from 'components/NotFoundPage';
import ProtectedRoute from 'components/ProtectedRoute';
import Account from 'features/Account';
import Admin from 'features/Admin';
import CallVideo from 'features/CallVideo';
import Home from 'features/Home';
import ChatLayout from 'layout/ChatLayout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/App.scss';

function App() {
    const dispatch = useDispatch();
    const [isFetch, setIsFetch] = useState(false);
    const { user } = useSelector((state) => state.global);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            if (token) await dispatch(fetchUserProfile());

            setIsFetch(true);
        };

        fetchProfile();
    }, []);

    if (!isFetch) return '';

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Home} />

                    <ProtectedRoute path="/chat" component={ChatLayout} />

                    <AdminProtectedRoute path="/admin" component={Admin} />
                    <ProtectedRoute
                        path="/call-video/:conversationId"
                        component={CallVideo}
                    />

                    <Route path="/account" component={Account} />

                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
