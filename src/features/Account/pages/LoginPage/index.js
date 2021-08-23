import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Tag, Typography } from 'antd';
import loginApi from 'api/loginApi';
import { setLogin } from 'app/globalSlice';
import InputField from 'customfield/InputField';
import { setLoading } from 'features/Account/accountSlice';

import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './style.scss';
import { loginValues } from 'features/Account/initValues';

const { Text, Title } = Typography;

LoginPage.propTypes = {};

function LoginPage(props) {
    const dispatch = useDispatch();

    const { isLogin } = useSelector((state) => state.global);
    const [isError, setError] = useState(false);

    const handleSubmit = async (values, actions) => {
        const { username, password } = values;

        try {
            dispatch(setLoading(true));

            const { token } = await loginApi.login(username, password);
            localStorage.setItem('token', token);

            dispatch(setLogin(true));
        } catch (error) {
            setError(true);
        }

        dispatch(setLoading(false));
    };

    if (isLogin) return <Redirect to="/chat" />;

    return (
        <div className="login-main-page">
            <div className="main">
                <Title level={2} style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#08aeea' }}>Đăng</Text> nhập
                </Title>
                <Divider />

                <Formik
                    initialValues={{ ...loginValues.initial }}
                    onSubmit={handleSubmit}
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
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default LoginPage;
