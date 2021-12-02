import { Spin } from 'antd';
import React, { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css'; // ES6
import { useDispatch, useSelector } from 'react-redux';
import AboutWebApp from './Components/AboutWebApp';
import Developer from './Components/Developer';
import Feature from './Components/Feature';
import Footer from './Components/Footer';
import Header from './Components/Header';
import {
    fetchDeveloper,
    fetchFeatures,
    fetchInfoApp,
    fetchInfoWebApp,
} from './homeSlice';
import './style.scss';

function Home(props) {
    const dispatch = useDispatch();
    const { developers, infoApp, isLoading, features, infoWebApps } =
        useSelector((state) => state.home);

    useEffect(() => {
        dispatch(fetchDeveloper());
        dispatch(fetchInfoApp());
        dispatch(fetchFeatures());
        dispatch(fetchInfoWebApp());
    }, []);

    return (
        <Spin size="large" spinning={isLoading}>
            <div id="home_page">
                <Header data={infoApp.length > 0 && infoApp[0]} />
                <Feature data={features} />
                <AboutWebApp data={infoWebApps.length > 0 && infoWebApps[0]} />
                <Developer data={developers} />
                <Footer
                    data={
                        infoWebApps.length > 0 && infoWebApps[0].additionalInfo
                    }
                />
            </div>
        </Spin>
    );
}

export default Home;
