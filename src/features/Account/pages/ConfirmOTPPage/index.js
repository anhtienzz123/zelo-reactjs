import {
    CloseCircleOutlined,
    DoubleLeftOutlined,
    LeftOutlined,
} from '@ant-design/icons';
import {
    Alert,
    Button,
    message,
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
import { useDispatch, useSelector, } from 'react-redux';
import { useParams, Link, Redirect,useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router';
import './style.scss';
import { otpValues } from 'features/Account/initValues';
import loginApi from 'api/loginApi';

const RESEND_OTP_TIME_LIMIT = 60;
const { Text, Title } = Typography;

function ConfirmOTPPage(props) {
    let resendOTPTimerInterval;
    const dispatch = useDispatch();
    const account = useState(''); //lấy otp
    const user = props.location.state.values; //lấy username,password
    const [isError, setError] = useState('');
    const history = useHistory();

    const success = () => {
        message.success('Đổi mật khẩu thành công', 10);
    };

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

    //Resend OTP
    const handleResendOTP = async (user) => {
        <Link
            to={{
                pathname: '/account/otp',
                state: { user }, // callback uesrname ,account
            }}></Link>;
        setOTPValue('');
        setCounter(RESEND_OTP_TIME_LIMIT);
        startResendOTPTimer();
        console.log('is user', user);
        dispatch(setLoading(true));
        const response = await loginApi.forgot(user.username);
        dispatch(setLoading(false));
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

    const handleLogin = async () => {
        const user = props.location.state.values;
        const { username, password } = user;
        console.log('is user', user);
        try {
            dispatch(setLoading(true));
            const { token } = await loginApi.login(username, password);
            localStorage.setItem('token', token);
            dispatch(setLogin(true));
        } catch (error) {
            setError('fail login');
        }

        dispatch(setLoading(false));
    };

    const handleConfirmOTP = async (account) => {
        try {
            dispatch(setLoading(true));
            console.log(user);
            console.log(account);
            const response = await loginApi.confirmPassword(
                user.username,
                account.otpValue,
                user.password
            );
            history.pushState('./login');
            console.log('is respone', response.data.message);
            success();
            console.log('kích hoạt thành công');
            handleLogin();
            dispatch(setLoading(true));
        } catch (error) {
            setError('OTP không hợp lệ hoặc hết hạn');
            message.error('Đổi mật khẩu thất bại', 10);
        }
        dispatch(setLoading(false));
    };

    return (
        <div className='otp-page'>
            <div className='main'>
                <Title level={2} style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#08aeea' }}>Xác Nhận OTP</Text>
                </Title>
                <Divider />
                <Formik
                    initialValues={{ ...otpValues.initial }}
                    onSubmit={(account) => handleConfirmOTP(account)}
                    validationSchema={otpValues.validationSchema}
                    enableReinitialize={true}>
                    {(formikProps) => {
                        return (
                            <Form>
                                <Row gutter={[0, 16]}>
                                    <Col span={24}>
                                        <Col offset={8} span={24}>
                                            <Typography>
                                                Đã gửi mã otp tới{' '}
                                                {user.username}
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
                                                    Bạn chưa nhận được mã OTP ?
                                                    Gửi sau 00:{counter}
                                                </Text>
                                            ) : (
                                                <Button
                                                    type='link'
                                                    onClick={() =>
                                                        handleResendOTP(user)
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
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default ConfirmOTPPage;
