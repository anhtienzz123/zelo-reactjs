import { CloseCircleOutlined, DoubleLeftOutlined, LeftOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Divider, Row, Tag, Typography } from 'antd';
import { setForgot } from 'app/globalSlice';
import InputField from 'customfield/InputField';
import { setLoading } from 'features/Account/accountSlice';

import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './style.scss';
import { forgotValues } from 'features/Account/initValues';
import loginApi from 'api/loginApi';

const RESEND_OTP_TIME_LIMIT = 30;
const { Text, Title } = Typography;

function ConfirmOTPPage(route) {
 
    const dispatch = useDispatch();
    const { account, isForgotPassword } = useState("");
    const { isForgot } = useSelector((state) => state.global);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let resendOTPTimerInterval;

    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
		RESEND_OTP_TIME_LIMIT
	);

    //set OTP
	const [otpValue, setOTPValue] = useState("");

    
	//start time from 30 to '0'
	const startResendOTPTimer = () => {
		if (resendOTPTimerInterval) {
			clearInterval(resendOTPTimerInterval);
		}
		resendOTPTimerInterval = setInterval(() => {
			if (resendButtonDisabledTime <= 0) {
				clearInterval(resendOTPTimerInterval);
			} else {
				setResendButtonDisabledTime(resendButtonDisabledTime - 1);
			}
		}, 1000);
	};

    //on click to resend otp
	const handleResendOTP = async () => {
		//clear input field
		setOTPValue("");
		setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
		startResendOTPTimer();
		dispatch(setLoading(true));
		const response = await loginApi.forgot({
		 	username: account.username,
		});
		dispatch(setLoading(false));
	};
    
    //Test
    const toggleTouched = () => {
        this.setState( prevState => ({
          touched: !prevState.touched
        }));
      }

	//chạy time 
	useEffect(() => {
		startResendOTPTimer();
		return () => {
			if (resendOTPTimerInterval) {
				clearInterval(resendOTPTimerInterval);
			}
		};
	}, [resendButtonDisabledTime]);


    const handleConfirmOTP = async () => {
        //const { username } = account;
        try {
            if(otpValue.length==6){
               dispatch(setLoading(true));
               const response = await loginApi.confirmPassword({
				...account,
				otp: otpValue,
               });
               dispatch(setLoading(false));
                  if (response.data?.message) {
                    setErrorMessage(response.data.message);
                    console.log('fail otp')
			      } else  {
                    console.log('Đổi mật khẩu thành công')
			      } 
            }
        //dispatch(setForgot(true));
        } catch (error) {
            setError(true);
        }
        dispatch(setLoading(false)); 
        console.log('OTP fail')
    };
    //if (isForgot) return <Redirect to="/account/login" />;

    return (
        <div className="otp-page">
            <div className="main">
                <Title level={2} style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#08aeea' }}>Xác Nhận OTP</Text> 
                </Title>
                <Divider />  
                <Formik
                    initialValues={{ ...forgotValues.initial }}
                    onSubmit={handleConfirmOTP}
                    validationSchema={forgotValues.validationSchema}
                    enableReinitialize={true}
                >
                    {(formikProps) => {
                        return (
                            <Form>
                              

                                <Row gutter={[0, 16]}>
                                    <Col span={24}>
                                        <FastField
                                            name="otp"
                                            component={InputField}
                                            type="text"
                                            title="Xác nhận"
                                            placeholder="Nhập OTP"
                                            maxLength={50}
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
                                                OTP không hợp lệ
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
                                            Xác nhận
                                        </Button>
                                    </Col>
                                    <Col span={24} offset={8}>  <p style={{ fontFamily:'sans-serif',
                                                textAlign:'left',
                                                //resend time >0 -> resend time -1
                                                 }}> {resendButtonDisabledTime > 0 ? (
                                                    <Text >
                                                        Bạn chưa nhận được mã OTP ? Gửi sau {resendButtonDisabledTime} giây
                                                    </Text>
                                                ) : (
                                                    <div onClick={handleResendOTP}>
                                                        <Link to='#'>
                                                            Gửi lại mã OTP
                                                        </Link>
                                                    </div>
                                                )}</p>
                                    </Col>
				     
                                </Row> 
                                <Divider />
                                <p style={{ color: '#08aeea',
                                                textAlign:'left',
                                                 }}><Link to='/account/login'><DoubleLeftOutlined/>  Quay lại</Link></p>
                               
                            </Form>
                           
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default ConfirmOTPPage;
