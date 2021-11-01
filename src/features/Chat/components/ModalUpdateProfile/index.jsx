import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Image, Modal, Row, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import meApi from 'api/meApi';
import DateOfBirthField from 'customfield/DateOfBirthField';
import GenderRadioField from 'customfield/GenderRadioField';
import InputFieldNotTitle from 'customfield/InputFieldNotTitle';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import * as Yup from 'yup';

ModalUpdateProfile.propTypes = {
    isVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    loading: PropTypes.bool,
};

ModalUpdateProfile.defaultProps = {
    isVisible: false,
    onCancel: null,
    onOk: null,
    loading: false,
};

const { Option } = Select;
function ModalUpdateProfile({ isVisible, onCancel, onOk, loading }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.global);
    const formRef = useRef();
    const [imgCover, setImgCover] = useState('');
    //upload
    const [fileList, setFileList] = useState([
        {
            url: user.avatar,
        },
    ]);
    const [coverList, setCoverList] = useState([]);

    const handleCancel = () => {
        onCancel(false);
    };
    //onchange img cover
    const onChangeCoverImage = ({ file, fileList }) => {
        setCoverList(fileList);
        handleUpdateImageCover();
    };
    //onchange avatar
    const onChangeAvatar = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        handleUpdateAvatar();
    };

    //update avatar
    const handleUpdateAvatar = async () => {
        try {
            for (let index = 0; index < fileList.length; index++) {
                const element = fileList[index].originFileObj;
                const frmdata = new FormData();
                frmdata.append('file', element);
                const linkAvartar = await meApi.updateAvatar(frmdata);
                //message.success("success", 5);
                //onCancel(false);
            }
        } catch (error) {
            console.log('link2', user.avatar);
        }
    };
    //update img-cover
    const handleUpdateImageCover = async () => {
        try {
            for (let i = 0; i < coverList.length; i++) {
                const element = coverList[i].originFileObj;
                const formdata = new FormData();
                formdata.append('file', element);
                const coverImage = await meApi.updateCoverImage(formdata);
                setImgCover(coverImage.coverImage);
            }
            //message.success("success", 5);
        } catch (error) {
            console.log('link2', user.coverImage);
        }
    };

    const handleSubmit = (values) => {
        console.log('values Submit: ', values);
    };

    const handleOke = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };

    return (
        <Modal
            title="Cập nhật thông tin"
            visible={isVisible}
            onOk={handleOke}
            onCancel={handleCancel}
            width={430}
        >
            <div className="img-cover" style={{ textAlign: 'center' }}>
                <Image width={385} height={145} src={imgCover} />

                <div
                    className="img-cover-update"
                    style={{ alignItems: 'right' }}
                >
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        onChange={onChangeCoverImage}
                        defaultFileList={coverList}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}></Button>
                    </Upload>
                </div>
                <div className="img-crop">
                    {/*----------- avatar */}
                    <ImgCrop rotate>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChangeAvatar}
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                </div>
            </div>

            <Divider />

            <Formik
                innerRef={formRef}
                initialValues={{
                    name: user.name,
                    dateOfBirth: user.dateOfBirth,
                    gender: user.gender ? 1 : 0,
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('Tên không được bỏ trống')
                        .max(100, 'Tên tối đa 100 kí tự'),
                })}
                enableReinitialize={true}
            >
                {(formikProps) => {
                    return (
                        <Form>
                            <Row gutter={[0, 16]}>
                                <Col span={24}>
                                    <p>Tên </p>
                                    <FastField
                                        name="name"
                                        component={InputFieldNotTitle}
                                        type="text"
                                        maxLength={100}
                                    ></FastField>
                                </Col>

                                <Col span={24}>
                                    <p>Ngày sinh</p>
                                    <FastField
                                        name="dateOfBirth"
                                        component={DateOfBirthField}
                                    ></FastField>
                                </Col>

                                <Col span={24}>
                                    <p>Giới tính</p>
                                    <FastField
                                        name="gender"
                                        component={GenderRadioField}
                                    ></FastField>
                                </Col>
                            </Row>
                        </Form>
                    );
                }}
            </Formik>
        </Modal>
    );
}

export default ModalUpdateProfile;
