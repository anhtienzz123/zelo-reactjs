import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Menu, Dropdown, Checkbox, Tooltip, Avatar, Form, Input } from 'antd';
import { HiOutlineAdjustments } from "react-icons/hi";
import { PushpinOutlined, LockOutlined, CaretRightOutlined, UserOutlined, AntDesignOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import './style.scss';
import MODAL_OPTION_STYLE from './ModalViewOptionStyle';

ModalViewOption.propTypes = {
    isModalVisible: PropTypes.bool,
    onCancel: PropTypes.func,
};

ModalViewOption.defaultProps = {
    isModalVisible: false,
    onCancel: null,
};

function ModalViewOption({ isModalVisible, onCancel }) {
    const [form] = Form.useForm();


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
                    <h3>Bao nhiêu lâu thì bán được 1 tỉ gói mè</h3>
                    <small>Tạo bởi <strong>Trần Hoàng Phúc</strong> - Hôm qua</small>
                </div>
                <p className='overview-text'>{`2 người tham gia 4 lượt bình chọn `}<CaretRightOutlined /></p>

                <div className="modal-view-option_list">
                    <div className="modal-view-option_item">
                        <div className="modal-view-otption_checkbox">
                            <Checkbox />
                        </div>

                        <div className="vote-message_item" >

                            <span className="vote-message_name-option">
                                1 năm bán hết
                            </span>

                            <strong className="vote-message_munber-voted">
                                3
                            </strong>
                            {/* style={{ width: countingPercent(ele.userIds.length) }} */}
                            <div className="vote-message_progress" />
                        </div>

                        <div className="modal-view-option_avatar">
                            <Avatar.Group
                                maxCount={1}
                                maxStyle={{
                                    color: '#f56a00',
                                    backgroundColor: '#fde3cf',
                                }}
                            >
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                                <Avatar
                                    style={{
                                        backgroundColor: '#f56a00',
                                    }}
                                >
                                    K
                                </Avatar>
                            </Avatar.Group>
                        </div>

                    </div>
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
                                                        placeholder={`Lựa chọn ${index + 1}`}
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



                                            <div className="temp-space"></div>


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