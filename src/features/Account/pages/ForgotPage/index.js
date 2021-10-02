import { CloseCircleOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Tag, Typography } from 'antd';
import loginApi from 'api/loginApi';
import InputField from 'customfield/InputField';
import { setLoading } from 'features/Account/accountSlice';
import { forgotValues } from 'features/Account/initValues';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './style.scss';

const { Text, Title } = Typography;

function ForgotPage(props) {
    const dispatch = useDispatch();

    const [isError, setError] = useState('');

    const handleForgot = async (values) => {
        const { username, password } = values;
        try {
            dispatch(setLoading(true));
            const response = await loginApi.forgot(username);
            props.history.push({ pathname: '/account/otp', state: { values } });
            // account was actived
            const account = await loginApi.fetchUser(username);
            console.log('actived', account.isActived);
            if (account.isActived === true) {
                console.log('account is actived !!');
            } else {
                setError('Tài khoản không tồn tại');
                console.log('not account imposible !!');
            }
        } catch (error) {
            setError('Tài khoản không tồn tại');
            console.log('fail forgot');
        }
        dispatch(setLoading(false));
    };

    return (
        <div className='forgot-page'>
            <div className='main'>
                <Title level={2} style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#08aeea' }}>Quên Mật Khẩu</Text>
                </Title>
                <Divider />

                <Formik
                    initialValues={{ ...forgotValues.initial }}
                    onSubmit={(values) => handleForgot(values)}
                    validationSchema={forgotValues.validationSchema}
                    enableReinitialize={true}>
                    {(formikProps) => {
                        return (
                            <Form>
                                <Row gutter={[0, 16]}>
                                    <Col offset={8}>
                                        <Text
                                            style={{
                                                color: '#08aeea',
                                                textAlign: 'center',
                                            }}>
                                            {' '}
                                            Nhập email/SĐT để nhận mã xác thực
                                        </Text>
                                    </Col>
                                    <br />
                                    <Col span={24}>
                                        <FastField
                                            name='username'
                                            component={InputField}
                                            type='text'
                                            title='Tài khoản'
                                            placeholder='Nhập tài khoản'
                                            maxLength={50}
                                            titleCol={8}
                                            inputCol={16}></FastField>
                                    </Col>
                                    <Col span={24}>
                                        <FastField
                                            name='password'
                                            component={InputField}
                                            type='password'
                                            title='Mật khẩu mới'
                                            placeholder='Nhập mật khẩu'
                                            maxLength={200}
                                            titleCol={8}
                                            inputCol={16}></FastField>
                                    </Col>

                                    <Col span={24}>
                                        <FastField
                                            name='passwordconfirm'
                                            component={InputField}
                                            type='password'
                                            title=' Xác Nhận Mật khẩu'
                                            placeholder='Xác nhận mật khẩu'
                                            maxLength={200}
                                            titleCol={8}
                                            inputCol={16}></FastField>
                                    </Col>

                                    {isError ? (
                                        <Col offset={8} span={16}>
                                            <Tag
                                                color='error'
                                                style={{
                                                    fontWeight: 'bold',
                                                }}
                                                icon={<CloseCircleOutlined />}>
                                                {isError}
                                            </Tag>
                                        </Col>
                                    ) : (
                                        ''
                                    )}

                                    <Col offset={8}>
                                        <Button
                                            type='primary'
                                            htmlType='submit'>
                                            Gửi OTP
                                        </Button>
                                    </Col>
                                </Row>
                                <Divider />
                                <p
                                    style={{
                                        color: '#08aeea',
                                        textAlign: 'left',
                                    }}>
                                    <Link to='/account/login'>
                                        <DoubleLeftOutlined /> Quay lại
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

export default ForgotPage;
