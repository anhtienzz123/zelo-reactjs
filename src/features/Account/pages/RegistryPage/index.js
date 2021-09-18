import { CloseCircleOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { Button,Row,Col,Tag,Divider,Typography, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { FastField,  Form, Formik } from 'formik';
import React, { useState } from 'react';
import './style.scss'
import {  setRegistry } from 'app/globalSlice';
import { setLoading } from 'features/Account/accountSlice';
import { Link, Redirect,useHistory} from 'react-router-dom';
import { registryValues } from 'features/Account/initValues';
import InputField from 'customfield/InputField';
import loginApi from 'api/loginApi';


const { Text, Title } = Typography;
function RegistryPage(props) {  
    const history = useHistory();
    const dispatch = useDispatch();
    const { isRegistry } = useSelector((state) => state.global);
    const [isError, setError] = useState("");
         
    const handleRegistry = async (values) => {
        const { name,username,password} = values;
        try {
            dispatch(setLoading(true));
            const response = await loginApi.registry(name,username,password); 
            props.history.push( {pathname: "/account/confirm",
            state: { values }});
            dispatch(setRegistry(true));
        } catch (error) {
            setError("Email/SĐT đã được sử dụng ");
            console.log('fail register');
        }
        dispatch(setLoading(false));
    };
    if (isRegistry) return <Redirect to= "./confirm"/>;
  
     return( 
     <div className="email-registry-page">
         <div className='main'>
         <Title level={2} style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#08aeea' }}>Đăng</Text> Ký
                </Title>
                <Divider />
                <Formik
                     initialValues={{ ...registryValues.initial }}
                     onSubmit={(values) => handleRegistry(values)}
                     validationSchema={registryValues.validationSchema}
                     enableReinitialize={true}
                >
                    {(formikProps) => { 
                    const {handleChange} = formikProps;
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
                                            placeholder="Nhập email/SĐT đăng ký"
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
                                            >{isError}
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
