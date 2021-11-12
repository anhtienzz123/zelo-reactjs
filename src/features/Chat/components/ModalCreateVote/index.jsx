import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, message, Modal } from 'antd';
import './style.scss';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import voteApi from 'api/voteApi';
import { useSelector } from 'react-redux';

ModalCreateVote.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
};

ModalCreateVote.defaultProps = {
    visible: false,
    onCancel: null,
};

function ModalCreateVote({ visible, onCancel }) {

    const [form] = Form.useForm();
    const { currentConversation } = useSelector(state => state.chat);


    function handleCancel() {
        if (onCancel) {
            onCancel();
        }
    }

    function handleOk() {
        form.validateFields().then((values) => {
            const { question, options } = values;
            console.log(values);
            voteApi.createVote(question, options, currentConversation).then(() => {
                form.resetFields();
                handleCancel();
                message.success('Tạo cuộc bình chọn thành công');
            }).catch(() => {
                message.error('đã có lỗi xảy ra');

            });

        }).catch((info) => {
            console.log('Validate Failed:', info);
        });

    }

    const DynamicFieldSet = () => {
        // const onFinish = values => {
        //     console.log('Received values of form:', values);
        // };

        return (
            <Form
                name="dynamic_form_item"
                layout='vertical'
                // onFinish={onFinish}
                initialValues={{ options: ['', ''] }}
                form={form}
            >

                <Form.Item
                    label="Chủ đề bình chọn"
                    name="question"
                    rules={[{ required: true, message: 'Đặt câu hỏi bình chọn' }]}
                    spellCheck={false}
                >
                    <Input />
                </Form.Item>


                <Form.List
                    name="options"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 2) {
                                    return Promise.reject(new Error('At least 2 passengers'));
                                }
                            },
                        },
                    ]}

                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Các lựa chọn' : ''}
                                    required={false}
                                    key={field.key}

                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Nhập thông tin lựa chọn",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input
                                            spellCheck={false}
                                            placeholder={`Lựa chọn ${index + 1}`}
                                            style={{ width: '100%' }}
                                            suffix={fields.length > 2 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        />


                                    </Form.Item>

                                </Form.Item>
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
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                {/* <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"

                    >
                        Submit
                    </Button>
                </Form.Item> */}
            </Form>
        );
    };


    return (

        <Modal
            title="Tạo bình chọn"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Tạo bình chọn'
            cancelText='Hủy'
            centered

        >
            <div id='modal-create-vote'>
                <DynamicFieldSet />
            </div>
        </Modal>

    );
}


export default ModalCreateVote;