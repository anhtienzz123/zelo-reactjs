import { CloseCircleOutlined, DoubleLeftOutlined, LeftOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Divider, Row, Tag, Typography } from 'antd';
import { setForgot } from 'app/globalSlice';
import InputField from 'customfield/InputField';
import { setLoading } from 'features/Account/accountSlice';

import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './style.scss';
import { forgotValues } from 'features/Account/initValues';
import loginApi from 'api/loginApi';


const { Text, Title } = Typography;

function ForgotPage(props) {
 
    const dispatch = useDispatch();

    const { isForgot } = useSelector((state) => state.global);
    const [isError, setError] = useState(false);

    const handleForgot = async (values, actions) => {
        const { username } = values;

        try {
            dispatch(setLoading(true));
            const response = await loginApi.forgot(username);
            console.log(response.data);
            // account was actived 
		 if (response.data) { //no have account
			Alert.alert("Cảnh báo", "Tài khoản không tồn tại");
		 } else {
		 	const account = await loginApi.fetchUser(username);
			console.log(account);
            // if (account.isActived)
			if (account){
                console.log('ok')
                dispatch(setForgot(true));
			}else{
                console.log('not ok')
			}
		}
            dispatch(setForgot(true));
        } catch (error) {
            setError(true);
            console.log('fail')
        }
        dispatch(setLoading(false));
    };

    //if (isForgot) return <Redirect to="/account/otp" />;

    return (
        <div className="forgot-page">
            <div className="main">
                <Title level={2} style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#08aeea' }}>Quên Mật Khẩu</Text> 
                </Title>
                <Divider />  
               

                <Formik
                    initialValues={{ ...forgotValues.initial }}
                    onSubmit={handleForgot}
                    validationSchema={forgotValues.validationSchema}
                    enableReinitialize={true}
                >
                    {(formikProps) => {
                        return (
                            <Form>
                              

                                <Row gutter={[0, 16]}>
                                    <Col offset={8}>
                                      <Text style={{ color: '#08aeea',
                                               textAlign: 'center'
                                                 }}
                                                 > Nhập email/SĐT để nhận mã xác thực
                                      </Text>
                                    </Col>                 
                                 <br/>
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

                                    <Col span={24}>
                                        <FastField
                                            name="passwordconfirm"
                                            component={InputField}
                                            type="password"
                                            title=" Xác Nhận Mật khẩu"
                                            placeholder="Xác nhận mật khẩu"
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
                                            Gửi OTP
                                        </Button>
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

export default ForgotPage;
