import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Tag, message, Typography } from 'antd';
import loginApi from 'api/loginApi';
import { fetchUserProfile, setLogin } from 'app/globalSlice';
import InputField from 'customfield/InputField';
import { setLoading } from 'features/Account/accountSlice';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import './style.scss';
import { loginValues } from 'features/Account/initValues';
import { unwrapResult } from '@reduxjs/toolkit';
import ReCAPTCHA from 'react-google-recaptcha';
import axiosClient from 'api/axiosClient';

const { Text, Title } = Typography;

LoginPage.propTypes = {};

function LoginPage(props) {
    const dispatch = useDispatch();
    const [isError, setError] = useState(false);
    const [isVerify, setVerify] = useState(false);
    const [keyGoogleCaptcha, setKeyGoogleCaptcha] = useState(null);
    const history = useHistory();

    const handleSubmit = async (values) => {
        const { username, password } = values;
        console.log(isVerify);
        try {
            if (isVerify) {
                dispatch(setLoading(true));
                const { token, refreshToken } = await loginApi.login(
                    username,
                    password
                );
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                dispatch(setLogin(true));
                const { isAdmin } = unwrapResult(
                    await dispatch(fetchUserProfile())
                );
                if (isAdmin) history.push('/admin');
                else history.push('/chat');
            } else {
                message.error('hãy xác thực capcha', 5);
            }
        } catch (error) {
            setError(true);
        }

        dispatch(setLoading(false));
    };

    const onChange = (value) => {
        console.log('Captcha value:', value);
        setVerify(true);
    };

    useEffect(() => {
        axiosClient
            .get('/KEY_GOOGLE_CAPTCHA')
            .then((res) => setKeyGoogleCaptcha(res.KEY_GOOGLE_CAPTCHA));
    }, []);
    return (
        <div className="login-main-page">
            <div className="main">
                <Title level={2} style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#08aeea' }}>Đăng</Text> Nhập
                </Title>
                <Divider />
                <Formik
                    initialValues={{ ...loginValues.initial }}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={loginValues.validationSchema}
                    enableReinitialize={true}
                >
                    {(formikProps) => {
                        return (
                            <Form>
                                <Row gutter={[0, 16]}>
                                    <Col span={24}>
                                        <FastField
                                            name="username"
                                            component={InputField}
                                            type="text"
                                            title="Tài khoản"
                                            placeholder="Nhập tài khoản"
                                            maxLength={50}
                                            titleCol={8}
                                            inputCol={16}
                                        ></FastField>
                                    </Col>

                                    <Col span={24}>
                                        <FastField
                                            name="password"
                                            component={InputField}
                                            type="password"
                                            title="Mật khẩu"
                                            placeholder="Nhập mật khẩu"
                                            maxLength={200}
                                            titleCol={8}
                                            inputCol={16}
                                        ></FastField>
                                    </Col>
                                    <Col offset={8} span={24}>
                                        <br />
                                        {keyGoogleCaptcha && (
                                            <ReCAPTCHA
                                                sitekey={keyGoogleCaptcha}
                                                onChange={onChange}
                                            />
                                        )}
                                    </Col>
                                    {isError ? (
                                        <Col offset={8} span={16}>
                                            <Tag
                                                color="error"
                                                style={{
                                                    fontWeight: 'bold',
                                                }}
                                                icon={<CloseCircleOutlined />}
                                            >
                                                Tài khoản không hợp lệ
                                            </Tag>
                                        </Col>
                                    ) : (
                                        ''
                                    )}

                                    <Col offset={8}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Đăng nhập
                                        </Button>
                                    </Col>
                                </Row>
                                <Divider />
                                <p
                                    style={{
                                        color: '#08aeea',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Link to="/account/forgot">
                                        {' '}
                                        Quên mật khẩu !
                                    </Link>
                                </p>

                                <br />
                                <p
                                    style={{
                                        color: '#08aeea',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Link to="/account/registry">
                                        {' '}
                                        Bạn chưa có tài khoản ?
                                    </Link>
                                </p>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default LoginPage;
