import { CaretRightOutlined, LockOutlined, MinusCircleOutlined, PlusOutlined, PushpinOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Dropdown, Form, Input, Menu, Modal } from 'antd';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineAdjustments } from "react-icons/hi";
import { useSelector } from 'react-redux';
import MODAL_OPTION_STYLE from './ModalViewOptionStyle';
import './style.scss';

ModalViewOption.propTypes = {
    isModalVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    data: PropTypes.object,
};

ModalViewOption.defaultProps = {
    isModalVisible: false,
    onCancel: null,
    data: {}
};

function ModalViewOption({ isModalVisible, onCancel, data }) {
    const [form] = Form.useForm();
    const { memberInConversation } = useSelector(state => state.chat);

    const [infoVote, setInfoVote] = useState(data);
    const { user } = useSelector(state => state.global);
    const [checkList, setCheckList] = useState([]);

    const preValue = useRef();
    useEffect(() => {
        if (isModalVisible) {
            preValue.current = getDefaultValues();
        }
    }, [isModalVisible]);




    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    }

    function handleOk() {
        form.validateFields().then((values) => {
            // const { question, options } = values;
            console.log(values);


        }).catch((info) => {
            console.log('Validate Failed:', info);
        });

    }

    const menu = (
        <Menu>
            <Menu.Item icon={<PushpinOutlined />}>
                <span className='item-menu'>Ghim lên đầu</span>
            </Menu.Item>
            <Menu.Item icon={<LockOutlined />}>
                <span className='item-menu'>Khóa bình chọn</span>
            </Menu.Item>
        </Menu>
    );


    const footer = (
        <div className="footer_wrapper">
            <div className="footer_left-btn">
                <Dropdown overlay={menu} placement="topLeft" arrow>
                    <Button style={{ background: '#396edd' }} icon={<HiOutlineAdjustments />} type="primary"></Button>
                </Dropdown>
            </div>

            <div className="footer_right-btn">
                <Button>Hủy</Button>
                <Button type="primary" onClick={handleOk}>Xác nhận</Button>
            </div>
        </div>
    )

    console.log('infoVote total', infoVote.options);



    const handleCheckboxChange = (values) => {
        setCheckList(values);

        let tempOptions = [...infoVote.options];


        let newOptions = tempOptions.map(ele => {

            let temp = ele.userIds.filter(ele => {
                return ele != user._id
            });

            return {
                ...ele,
                userIds: temp
            }
        });



        let options = newOptions.map(optionEle => {
            const flag = values.find(ele => optionEle.name === ele);
            if (flag) {
                let optionSearchTemp = { ...optionEle, userIds: [...optionEle.userIds] };
                optionSearchTemp.userIds.push(user._id);
                return optionSearchTemp;
            }
            return optionEle;
        });


        setInfoVote({ ...infoVote, options });

    }

    const getUserFromConver = (userId) => {
        return memberInConversation.find(ele => ele._id === userId);
    }

    const checkNumberUserSelected = () => {
        let count = 0;
        infoVote.options.forEach((option) => {
            if (option.userIds.length > 0) {
                count += option.userIds.length;
            }
        })
        return count;
    }


    const countingPercent = (amoutVote) => {
        return (amoutVote / checkNumberUserSelected()) * 100;
    }



    const getDefaultValues = () => {
        let temp = [];
        infoVote.options.forEach(option => {
            option.userIds.forEach(userId => {
                if (userId === user._id) {
                    temp.push(option.name);
                }
            })
        })
        return temp;
    }


    return (

        <Modal
            title="Bình chọn"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={footer}
            centered
            bodyStyle={MODAL_OPTION_STYLE.BODY_STYLE}
        >

            <div className='modal-view-option'>
                <div className="modal-view-option_title">
                    <h3>{infoVote?.content}</h3>
                    <small>Tạo bởi <strong>{infoVote?.user?.name}</strong> - Hôm qua</small>
                </div>
                <p className='overview-text'>{`2 người tham gia 4 lượt bình chọn `}<CaretRightOutlined /></p>

                <div className="modal-view-option_list">

                    <Checkbox.Group onChange={handleCheckboxChange} defaultValue={getDefaultValues()}>

                        {infoVote.options.map((ele, index) => (
                            <div className="modal-view-option_item" key={index}>
                                <div className="modal-view-option_checkbox">
                                    <Checkbox value={ele.name} checked={true} >

                                        <div className="vote-message_item" >


                                            <span className="vote-message_name-option">
                                                {ele.name}
                                            </span>

                                            <strong className="vote-message_munber-voted">
                                                {ele.userIds.length}
                                            </strong>

                                            <div className="vote-message_progress" style={{ width: countingPercent(ele.userIds.length) }} />

                                        </div>

                                    </Checkbox>
                                </div>






                                <div className="modal-view-option_avatar">
                                    <Avatar.Group
                                        maxCount={1}
                                        maxStyle={{
                                            color: '#f56a00',
                                            backgroundColor: '#fde3cf',
                                        }}
                                    >

                                        {(ele.userIds.length > 0 && memberInConversation.length > 0) && (
                                            ele.userIds.map((ele, index) => (
                                                <PersonalIcon
                                                    key={index}
                                                    name={getUserFromConver(ele).name}
                                                    avatar={getUserFromConver(ele).avatar}
                                                    demention={32}

                                                />
                                            ))
                                        )}

                                    </Avatar.Group>
                                </div>

                            </div>
                        ))}
                    </Checkbox.Group>
                </div>



                <div className="modal-view-option_add">
                    <Form
                        name="dynamic_form_nest_item"
                        layout='vertical'
                        form={form}
                    >


                        <Form.List
                            name="options"

                        >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                        <div className="modal-view-option_form">

                                            <div className="form-checkbox">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'checkbox']}
                                                    fieldKey={[fieldKey, 'checkbox']}
                                                    valuePropName="checked"
                                                >

                                                    <Checkbox />
                                                </Form.Item>
                                            </div>


                                            <div className="form-input">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'name']}
                                                    fieldKey={[fieldKey, 'name']}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            // whitespace: true,
                                                            message: "Nhập thông tin lựa chọn",
                                                        },
                                                    ]}

                                                >
                                                    <Input
                                                        spellCheck={false}
                                                        placeholder={`Lựa chọn ${infoVote && infoVote.options.length + 1}`}
                                                        style={{ width: '100%' }}
                                                        suffix={fields.length > 0 ? (
                                                            <MinusCircleOutlined
                                                                className="dynamic-delete-button"
                                                                onClick={() => remove(name)}
                                                            />
                                                        ) : null}
                                                    />

                                                </Form.Item>
                                            </div>




                                            {/* </div> */}

                                        </div>

                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="default"
                                            onClick={() => add()}
                                            style={{ width: '30%' }}
                                            icon={<PlusOutlined />}

                                        >
                                            Thêm lựa chọn
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                    </Form>
                </div>
            </div>


        </Modal>

    );
}

export default ModalViewOption;