import { EditOutlined, InfoCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Checkbox, Col, Divider, Input, Modal, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import { fetchListFriends } from 'features/Chat/chatSlice';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemsSelected from '../ItemsSelected';
import PersonalIcon from '../PersonalIcon';
import './style.scss';

ModalCreateGroup.propTypes = {
    isVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    loading: PropTypes.bool,
};

ModalCreateGroup.defaultProps = {
    isVisible: false,
    onCancel: null,
    onOk: null,
    loading: false
};

function ModalCreateGroup({ isVisible, onCancel, onOk, loading }) {
    const [checkList, setCheckList] = useState([]);
    const [itemSelected, setItemSelected] = useState([]);
    const { friends } = useSelector(state => state.chat);
    const [isShowError, setIsShowError] = useState(false);
    const [nameGroup, setNameGroup] = useState('');
    const [frInput, setFrInput] = useState('');


    console.log("Checklist", checkList);

    function clearData() {
        setIsShowError(false);
        setNameGroup('');
        setItemSelected([]);
        setCheckList([]);
    }


    const dispatch = useDispatch();
    useEffect(() => {
        if (isVisible) {
            dispatch(fetchListFriends({
                name: frInput
            }));
        }
    }, [isVisible, frInput]);



    const handleOk = () => {
        const userIds = itemSelected.map(item => item._id);
        if (onOk) {
            onOk({
                name: nameGroup,
                userIds,
            })
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            clearData();
            onCancel(false)
        }
    };

    const handleCheckBoxChange = (checkedValues) => {


        console.log("Checkbox", checkedValues);

        setCheckList(checkedValues);

        let itemCheck = [];

        checkedValues.forEach((check) => {
            friends.forEach((temp) => {
                if (check === temp._id) {
                    itemCheck.push(temp);
                }
            });
        });

        setItemSelected(itemCheck);


    };

    const handleRemoveItem = (id) => {
        let tempList = [];

        checkList.forEach(value => {
            if (value !== id) {
                tempList.push(value);
            }
        })
        setCheckList(tempList);

        let tempItemChecked = [];

        tempList.forEach((tempL) => {
            friends.forEach((tempD) => {
                if (tempL === tempD._id) {
                    tempItemChecked.push(tempD);
                }
            });
        });

        setItemSelected(tempItemChecked);

    }

    const handleChange = (e) => {
        const value = e.target.value;
        setNameGroup(value);
    }

    const handleOnBlur = (e) => {
        !nameGroup.length > 0 ? setIsShowError(true) : setIsShowError(false);
    }

    const handleChangeFriend = (e) => {
        const value = e.target.value;
        setFrInput(value);
    }



    return (
        <Modal
            title="Tạo nhóm"
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered={true}
            okText='Tạo nhóm'
            cancelText='Hủy'
            okButtonProps={{ disabled: !(itemSelected.length > 0 && nameGroup.length > 0) }}
            confirmLoading={loading}


        >
            <div id="modal-create-group">
                <div className="heading-group">
                    <div className="select-background">
                        <EditOutlined />
                    </div>

                    <div className="input-name-group">
                        <Input
                            size="middle"
                            placeholder="Nhập tên nhóm"
                            style={{ width: '100%' }}
                            onBlur={handleOnBlur}
                            value={nameGroup}
                            onChange={handleChange}
                        />

                        {isShowError && <Text type="danger"><InfoCircleFilled /> Tên nhóm không được để trống</Text>}
                    </div>
                </div>

                <Divider orientation="left" plain><span className='divider-title'>Thêm bạn vào nhóm</span></Divider>
                <div className="search-friend-input">
                    <Input
                        size="middle"
                        placeholder="Nhập tên"
                        style={{ width: '100%' }}
                        prefix={<SearchOutlined />}
                        onChange={handleChangeFriend}
                        value={frInput}
                    />
                </div>


                <Divider />

                <div className="list-friend-interact">
                    <div className={`list-friend-interact--left ${itemSelected.length > 0 ? '' : 'full-container'}`}>
                        <div className="title-list-friend">
                            <span>Danh sách bạn bè</span>
                        </div>


                        <div className="checkbox-list-friend">
                            <Checkbox.Group
                                style={{ width: '100%' }}
                                onChange={handleCheckBoxChange}
                                value={checkList}
                            >
                                <Row gutter={[0, 12]}>

                                    {friends.map((element, index) => (
                                        <Col span={24} key={index}>
                                            <Checkbox value={element._id}>
                                                <div className="item-checkbox">
                                                    <PersonalIcon
                                                        demention={36}
                                                        avatar={element.avatar}
                                                    />

                                                    <span className='item-name'>{element.name}</span>
                                                </div>
                                            </Checkbox>
                                        </Col>


                                    ))}

                                </Row>
                            </Checkbox.Group>

                        </div>
                    </div>


                    <div className={`list-friend-interact--right ${itemSelected.length > 0 ? '' : 'close'}`}>
                        <div className="title-list-friend-checked">
                            <strong>Đã chọn: {itemSelected.length > 0 && itemSelected.length}</strong>
                        </div>

                        <div className="checkbox-list-friend">
                            <ItemsSelected
                                items={itemSelected}
                                onRemove={handleRemoveItem}
                            />

                        </div>
                    </div>
                </div>


            </div>
        </Modal >
    );
}

export default ModalCreateGroup;