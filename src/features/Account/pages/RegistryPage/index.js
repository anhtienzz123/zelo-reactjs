import { CloseCircleOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row,message, Tag, Typography } from 'antd';
import loginApi from 'api/loginApi';
import InputField from 'customfield/InputField';
import { setLoading } from 'features/Account/accountSlice';
import { registryValues } from 'features/Account/initValues';
import { FastField, Form, Formik } from 'formik';
import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './style.scss';

const RESEND_OTP_TIME_LIMIT = 1;
const { Text, Title } = Typography;
function RegistryPage(props) {
    const dispatch = useDispatch();
    let resendOTPTimerInterval;
    const [isError, setError] = useState('');
    const history = useHistory();
    //set time counter
    const [counter, setCounter] = useState(RESEND_OTP_TIME_LIMIT);
    //set OTP value
    const [otpValue, setOTPValue] = useState('');


    const handleRegistry = async (values) => {
        const { name, username, password,passwordconfirm } = values;
        console.log('is user',values);
        try {
            dispatch(setLoading(true));
            setOTPValue('');
            setCounter(RESEND_OTP_TIME_LIMIT);
            console.log('is user1',values.username);
            startResendOTPTimer();
            if(password===passwordconfirm && password.length===8){
                 await loginApi.registry(name, username, password);
                 message.success('Đã gửi mã OTP', 10);
            }else{
                  console.log('mk không khớp hoặc không đủ 6 ký tự !!');
             }
        } catch (error) {
            setError('Email/SĐT đã được sử dụng ');
            console.log('fail register');
        }
        dispatch(setLoading(false));
    };
//--------------------------------otp
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
        dispatch(setLoading(true));
        const response = await loginApi.confirmPassword(
            values.username,
            values.otpValue,
            values.password
        );
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
                                    <Col span ={24}>
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
                                           
                                            htmlType='submit'
                                            >

                                            Đăng Ký
                                        </Button>
                                            {' '}
                                            {counter > 0 ? (
                                                <Button
                                                type='primary'
                                               >     
                                                Gửi lại mã OTP 00:{counter}
                                               </Button>
                                            ) : (
                                                <Button
                                                    type='primary'
                                                    onClick={()=>handleRegistry(formikProps.values) }>     
                                                    Gửi lại mã OTP
                                                </Button>
                                            )}
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
