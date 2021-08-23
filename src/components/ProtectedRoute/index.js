import { fetchUserProfile } from 'app/globalSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const { isLogin } = useSelector((state) => state.global);
    const [isFetch, setIsFetch] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');

            if (token) await dispatch(fetchUserProfile());

            setIsFetch(true);
        };

        fetchUser();
    }, []);

    if (!isFetch) return <div></div>;

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isLogin) return <Component {...props} />;

                return (
                    <Redirect
                        to={{
                            pathname: '/account/login',
                            state: {
                                from: props.location,
                            },
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;
