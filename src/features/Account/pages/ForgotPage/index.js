import { CloseCircleOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, message, Row, Tag, Typography } from 'antd';
import loginApi from 'api/loginApi';
import { setLogin } from 'app/globalSlice';
import InputField from 'customfield/InputField';
import { setLoading } from 'features/Account/accountSlice';
import { forgotValues } from 'features/Account/initValues';
import { FastField, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import './style.scss';
import * as Yup from 'yup';

const RESEND_OTP_TIME_LIMIT = 60;
const { Text, Title } = Typography;
function ForgotPage(props) {
    const dispatch = useDispatch();
    let resendOTPTimerInterval;
    const [isError, setError] = useState('');
    const history = useHistory();
    //set time counter
    const [counter, setCounter] = useState(0);
    //set OTP value
    const [otpValue, setOTPValue] = useState('');
    const [account, setAccount] = useState(null);

    const handleForgot = async (values) => {
        const { username, password, passwordconfirm } = values;
        //  console.log('actived',username);
        console.log('actived', username);
        try {
            dispatch(setLoading(true));
            setOTPValue('');
            setCounter(RESEND_OTP_TIME_LIMIT);
            startResendOTPTimer();
            // account was actived
            const account = await loginApi.fetchUser(username);
            setAccount(account);
            if (password === passwordconfirm && password.length >= 8) {
                await loginApi.forgot(username);
                console.log('account is actived !!');
                message.success('Đã gửi mã OTP', 10);
            } else {
                console.log('mk không khớp hoặc không đủ 8 ký tự !!');
            }
        } catch (error) {
            setError('Tài khoản không tồn tại');
            console.log('fail forgot');
        }
        dispatch(setLoading(false));
    };

    const valide = (values) => {
        const { name, username, password, passwordconfirm } = values;
        if (
            name === null ||
            username === null ||
            password === null ||
            passwordconfirm === null
        ) {
            setError('thông tin chưa đầy đủ');
        } else {
        }
    };
    //------------------ otp-------------------------
    const success = () => {
        message.success('Đổi mật khẩu thành công', 10);
    };
    //start time from 30 to '0'
    const startResendOTPTimer = () => {
        if (resendOTPTimerInterval) {
            clearInterval(resendOTPTimerInterval);
        }
        resendOTPTimerInterval = setInterval(() => {
            if (counter <= 0) {
                clearInterval(resendOTPTimerInterval);
            } else {
                setCounter(counter - 1);
            }
        }, 1000);
    };

    //useEffect khi counter thay đổi
    useEffect(() => {
        startResendOTPTimer();
        return () => {
            if (resendOTPTimerInterval) {
                clearInterval(resendOTPTimerInterval);
            }
        };
    }, [counter]);

    const handleConfirmOTP = async (values) => {
        try {
            valide(values);
            dispatch(setLoading(true));

            if (account.isActived) {
                await loginApi.confirmPassword(
                    values.username,
                    values.otpValue,
                    values.password
                );
            } else {
                await loginApi.confirmAccount(values.username, values.otpValue);
                await loginApi.confirmPassword(
                    values.username,
                    values.otpValue,
                    values.password
                );
            }

            success();
            console.log('kích hoạt thành công');
            history.push('/account/login');
            dispatch(setLoading(true));
        } catch (error) {
            setError('OTP không hợp lệ hoặc hết hạn');
            message.error('Đổi mật khẩu thất bại', 10);
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
                                    <Col span={24}>
                                        <FastField
                                            name='otpValue'
                                            component={InputField}
                                            type='text'
                                            title='Xác nhận'
                                            placeholder='Nhập 6 ký tự OTP'
                                            maxLength={50}
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

                                    <Col offset={8} span={16}>
                                        <Button
                                            type='primary'
                                            onClick={() =>
                                                handleConfirmOTP(
                                                    formikProps.values
                                                )
                                            }>
                                            Xác nhận
                                        </Button>{' '}
                                        {counter > 0 ? (
                                            <Button type='primary'>
                                                Gửi lại mã OTP 00:{counter}
                                            </Button>
                                        ) : (
                                            <Button
                                                type='primary'
                                                htmlType='submit'>
                                                Gửi lại mã OTP
                                            </Button>
                                        )}
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
