import { CloseCircleOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { Button,Row,Col,Tag,Divider,Typography, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { FastField,  Form, Formik } from 'formik';
import React, { useState } from 'react';
import './style.scss'
import {  setRegistry } from 'app/globalSlice';
import { setLoading } from 'features/Account/accountSlice';
import { Link, Redirect} from 'react-router-dom';
import { registryValues } from 'features/Account/initValues';
import InputField from 'customfield/InputField';
import loginApi from 'api/loginApi';


const { Text, Title } = Typography;

function RegistryPage(props) {

    const dispatch = useDispatch();
    const { isRegistry } = useSelector((state) => state.global);
    const [isError, setError] = useState(false);

    const handleRegistry = async (values, actions) => {
        const { username} = values;

        try {
            dispatch(setLoading(true));
            const response  = await loginApi.registry(values);
            dispatch(setRegistry(true));

            if (response.data?.status) {
                const account = await loginApi.fetchUser(username);
                console.log('ok')
            } else {
                console.log(' not ok')
            }
        } catch (error) {
            setError(true);
            console.log(' fail')
        }
        dispatch(setLoading(false));
    };

    if (isRegistry) return <Redirect to="/account/login" />;
     return( 
     <div className="email-registry-page">
         <div className='main'>
         <Title level={2} style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#08aeea' }}>Đăng</Text> Ký
                </Title>
                <Divider />
                <Formik
                     initialValues={{ ...registryValues.initial }}
                     onSubmit={handleRegistry}
                     validationSchema={registryValues.validationSchema}
                     enableReinitialize={true}
                >
                    {(formikProps) => {
                        return (
                            <Form>
                                <Row gutter={[0, 16]}>
                                <Col span={24}>
                                        <FastField
                                            name="name"
                                            component={InputField}
                                            type="text"
                                            title="Tên "
                                            placeholder="Nhập tên đầy đủ"
                                            maxLength={50}
                                            titleCol={8}
                                            inputCol={16}
                                        ></FastField>
                                    </Col>
                                    <Col span={24}>
                                        <FastField
                                            name="username"
                                            component={InputField}
                                            type="text"
                                            title="Tài khoản"
                                            placeholder="Nhập email đăng ký"
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
                                        <Button type="primary"
                                            htmlType="submit">
                        
                                            Đăng Ký
                                        </Button>
                                        
                                    </Col>
                                    
                                    <Col span={24} offset={8}>    <p style={{ fontWeight:'bold',fontFamily:'sans-serif',
                                                textAlign:'left',
                                                 }}>Bạn đã có tài khoản ?<Link to='/account/login'> Đăng Nhập </Link> tại đây </p>
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

export default RegistryPage;
