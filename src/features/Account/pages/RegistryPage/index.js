import { CloseCircleOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Tag, Typography } from 'antd';
import loginApi from 'api/loginApi';
import InputField from 'customfield/InputField';
import { setLoading } from 'features/Account/accountSlice';
import { registryValues } from 'features/Account/initValues';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';

const { Text, Title } = Typography;

function RegistryPage(props) {
    const dispatch = useDispatch();
    const [isError, setError] = useState('');

    const handleRegistry = async (values) => {
        const { name, username, password } = values;
        try {
            console.log('name: ', name, username, password);
            dispatch(setLoading(true));
            await loginApi.registry(name, username, password);
            props.history.push({
                pathname: '/account/confirm',
                state: { values },
            });
        } catch (error) {
            setError('Email/SĐT đã được sử dụng ');
            console.log('fail register');
        }
        dispatch(setLoading(false));
    };

    return (
        <div className='email-registry-page'>
            <div className='main'>
                <Title level={2} style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#08aeea' }}>Đăng</Text> Ký
                </Title>
                <Divider />
                <Formik
                    initialValues={{ ...registryValues.initial }}
                    onSubmit={(values) => handleRegistry(values)}
                    validationSchema={registryValues.validationSchema}
                    enableReinitialize={true}>
                    {(formikProps) => {
                        return (
                            <Form>
                                <Row gutter={[0, 16]}>
                                    <Col span={24}>
                                        <FastField
                                            name='name'
                                            component={InputField}
                                            type='text'
                                            title='Tên '
                                            placeholder='Nhập tên đầy đủ'
                                            maxLength={50}
                                            titleCol={8}
                                            inputCol={16}></FastField>
                                    </Col>
                                    <Col span={24}>
                                        <FastField
                                            name='username'
                                            component={InputField}
                                            type='text'
                                            title='Tài khoản'
                                            placeholder='Nhập email/SĐT đăng ký'
                                            maxLength={50}
                                            titleCol={8}
                                            inputCol={16}></FastField>
                                    </Col>

                                    <Col span={24}>
                                        <FastField
                                            name='password'
                                            component={InputField}
                                            type='password'
                                            title='Mật khẩu'
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
                                            Đăng Ký
                                        </Button>
                                    </Col>

                                    <Col span={24} offset={8}>
                                        {' '}
                                        <p
                                            style={{
                                                fontWeight: 'bold',
                                                fontFamily: 'sans-serif',
                                                textAlign: 'left',
                                            }}>
                                            Bạn đã có tài khoản ?
                                            <Link to='/account/login'>
                                                {' '}
                                                Đăng Nhập{' '}
                                            </Link>{' '}
                                            tại đây{' '}
                                        </p>
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

export default RegistryPage;
