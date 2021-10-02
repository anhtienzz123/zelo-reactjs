import {
    CloseCircleOutlined,
    DoubleLeftOutlined,
    LeftOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    message,
    Button,
    Col,
    Divider,
    Row,
    Tag,
    Typography,
} from 'antd';
import { setLogin } from 'app/globalSlice';
import InputField from 'customfield/InputField';
import { setLoading } from 'features/Account/accountSlice';

import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, Redirect, useRouteMatch } from 'react-router-dom';
import './style.scss';
import { forgotValues } from 'features/Account/initValues';
import loginApi from 'api/loginApi';

const RESEND_OTP_TIME_LIMIT = 60;
const { Text, Title } = Typography;

function ConfirmAccountPage(props) {
    const dispatch = useDispatch();
    const account = props.location.state.values;
    const otp = useState(''); //lấy otp
    const { isLogin } = useSelector((state) => state.global);
    const [isError, setError] = useState('');

    const success = () => {
        message.success('Kích hoạt thành công', 10);
    };

    let resendOTPTimerInterval;
    //set time counter
    const [counter, setCounter] = useState(RESEND_OTP_TIME_LIMIT);
    //set OTP value
    const [otpValue, setOTPValue] = useState('');
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
    //on click to resend otp
    const handleResendOTP = async (account) => {
        <Link
            to={{
                pathname: '/account/confirm',
                state: { account }, // callback uesrname ,account
            }}></Link>;
        setOTPValue('');
        console.log('is user', account);
        setCounter(RESEND_OTP_TIME_LIMIT);
        startResendOTPTimer();
        dispatch(setLoading(true));
        const response = await loginApi.forgot(account.username);
        dispatch(setLoading(false));
    };

    //chạy time
    useEffect(() => {
        startResendOTPTimer();
        return () => {
            if (resendOTPTimerInterval) {
                clearInterval(resendOTPTimerInterval);
            }
        };
    }, [counter]);

    useEffect(() => {
        dispatch(setLoading(false));
    }, []);

    // const handleLogin = async () => {
    //     const { username, password } = account;
    //     try {
    //         dispatch(setLoading(true));
    //         const { token } = await loginApi.login(username, password);
    //         localStorage.setItem('token', token);
    //         dispatch(setLogin(true));
    //     } catch (error) {
    //         setError('fail login');
    //     }

    //     dispatch(setLoading(false));
    // };

    const handleConfirmAccount = async (account) => {
        console.log('is user',account);
        try {
            dispatch(setLoading(true));
            console.log(account);
            const response = await loginApi.confirmAccount(
                account.username,
                account.otpValue
            );
            console.log('kích hoạt thành công');
            success();
            dispatch(setLoading(true));
        } catch (error) {
            console.log('is user',account);
            console.log('is otp',account.otpValue);
            message.error('Kích hoạt thất bại', 10);
            setError('OTP không hợp lệ hoặc hết hạn');
        }
        dispatch(setLoading(false));
    };
    if (isLogin) return <Redirect to='/account/login' />;

    return (
        <div className='confirm-account-page'>
            <div className='main'>
                <Title level={2} style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#08aeea' }}>Xác Nhận Tài Khoản</Text>
                </Title>
                <Divider />
                <Formik
                    initialValues={{ ...forgotValues.initial }}
                  //  onSubmit={(account) => handleConfirmAccount(account)}
                    validationSchema={forgotValues.validationSchema}
                    enableReinitialize={true}>
                    {(formikProps) => {
                        return (
                            <Form>
                                <>
                                    <Row gutter={[0, 16]}>
                                        <Col span={24}>
                                            <Col offset={8} span={24}>
                                                <Typography>
                                                    Đã gửi mã OTP đến{' '}
                                                    {account.username}
                                                </Typography>
                                            </Col>
                                            <br />
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
                                                    icon={
                                                        <CloseCircleOutlined />
                                                    }>
                                                    {isError}
                                                </Tag>
                                            </Col>
                                        ) : (
                                            ''
                                        )}

                                        <Col offset={8}>
                                            <Button
                                                type='primary'
                                                htmlType='submit'
                                                >
                                                Xác nhận
                                            </Button>
                                        </Col>
                                        <Col span={24} offset={8}>
                                            {' '}
                                            <p
                                                style={{
                                                    fontFamily: 'sans-serif',
                                                    textAlign: 'left',
                                                    //resend time >0 -> resend time -1
                                                }}>
                                                {' '}
                                                {counter > 0 ? (
                                                    <Text>
                                                        Bạn chưa nhận được mã
                                                        OTP ? Gửi sau 00:
                                                        {counter}
                                                    </Text>
                                                ) : (
                                                    <Button
                                                        type='link'
                                                        onClick={() =>
                                                            handleResendOTP(
                                                                account
                                                            )
                                                        }>
                                                        Gửi lại mã OTP
                                                    </Button>
                                                )}
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
                                </>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default ConfirmAccountPage;
