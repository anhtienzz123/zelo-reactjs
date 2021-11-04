import { EditOutlined, InfoCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Checkbox, Col, Divider, Input, Modal, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ItemsSelected from '../ItemsSelected';
import PersonalIcon from '../PersonalIcon';
import './style.scss';
ModalAddMemberToConver.propTypes = {

};

function ModalAddMemberToConver({ loading, onOk, onCancel, isVisible, typeModal }) {


    const [itemSelected, setItemSelected] = useState([]);
    const { friends, memberInConversation } = useSelector(state => state.chat);
    const [frInput, setFrInput] = useState('');
    const initialValue = memberInConversation.map(ele => ele._id);
    const [checkList, setCheckList] = useState([]);
    const [nameGroup, setNameGroup] = useState('');
    const [isShowError, setIsShowError] = useState(false);
    const [initalFriend, setInitalFriend] = useState([]);



    useEffect(() => {
        if (isVisible) {
            setInitalFriend(friends);
        } else {
            setFrInput('');
            setCheckList([]);
            setItemSelected([]);
            setNameGroup('');
            setIsShowError(false);
        }
    }, [isVisible])




    const handleOk = () => {
        const userIds = itemSelected.map(ele => ele._id);

        if (onOk) {
            if (typeModal === 1) {
                onOk([...checkList], nameGroup);
            } else {
                onOk(userIds);
            }

        }
    }

    const handleCancel = () => {
        if (onCancel) {
            onCancel(false);
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setFrInput(value);

        if (!value && isVisible) {
            setInitalFriend(friends);
        } else {
            const tempFriends = [...initalFriend];
            const realFriends = [];
            tempFriends.forEach((ele) => {
                const index = ele.name.search(value);
                if (index > -1) {
                    realFriends.push(ele);
                }
            })
            setInitalFriend(realFriends);
        }
    }

    const handleChangeCheckBox = (e) => {
        const value = e.target.value;

        // check xem có trong checklist chưa
        const index = checkList.findIndex(element => element === value);
        let checkListTemp = [...checkList];
        let itemSelectedTemp = [...itemSelected];


        // nếu như đã có
        if (index !== -1) {
            itemSelectedTemp = itemSelectedTemp.filter(element => element._id !== value);

            checkListTemp = checkListTemp.filter(element => element !== value);

            // chưa có
        } else {
            checkListTemp.push(value);
            const index = initalFriend.findIndex(element => element._id === value);

            if (index !== -1) {
                itemSelectedTemp.push(initalFriend[index]);
            }
        }
        setCheckList(checkListTemp);
        setItemSelected(itemSelectedTemp);

    }

    const handleRemoveItem = (id) => {

        let checkListTemp = [...checkList];
        let itemSelectedTemp = [...itemSelected];

        itemSelectedTemp = itemSelectedTemp.filter(element => element._id !== id);

        checkListTemp = checkListTemp.filter(element => element !== id);

        setCheckList(checkListTemp);
        setItemSelected(itemSelectedTemp);

        setFrInput('');
        setInitalFriend(friends);

    }


    const handleChange = (e) => {
        const value = e.target.value;
        setNameGroup(value);


    }

    const handleOnBlur = (e) => {
        !nameGroup.length > 0 ? setIsShowError(true) : setIsShowError(false);
    }






    // kiểm tra người có trong nhóm và disable những đối tượng đó
    const checkInitialValue = (value) => {
        const index = initialValue.findIndex(ele => ele === value);
        return index > -1;
    }

    return (
        <Modal
            title={typeModal === 2 ? 'Thêm thành viên' : 'Tạo nhóm'}
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered={true}
            okText='Xác nhận'
            cancelText='Hủy'
            okButtonProps={{ disabled: ((!nameGroup.trim().length > 0 && typeModal === 1) || checkList.length === initialValue.length) }}
            confirmLoading={loading}


        >

            <div id="modal-add-member-to-conver">

                {typeModal === 1 &&
                    <>

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


                    </>

                }



                <div className="search-friend-input">
                    <Input
                        size="middle"
                        placeholder="Nhập tên bạn muốn tìm kiếm"
                        style={{ width: '100%' }}
                        prefix={<SearchOutlined />}
                        onChange={handleSearch}
                        value={frInput}
                    />
                </div>


                <Divider />

                <div className="list-friend-interact">
                    {/* ${itemSelected.length > 0 ? '' : 'full-container'} */}
                    <div className={`list-friend-interact--left `}>
                        <div className="title-list-friend">
                            <span>Danh sách bạn bè</span>
                        </div>


                        <div className="checkbox-list-friend">
                            <Checkbox.Group
                                style={{ width: '100%' }}
                                // onChange={handleCheckBoxChange}
                                value={checkList}
                            >
                                <Row gutter={[0, 12]}>

                                    {initalFriend.map((element, index) => (
                                        <Col span={24} key={index}>
                                            <Checkbox
                                                disabled={checkInitialValue(element._id)}
                                                value={element._id}
                                                onChange={handleChangeCheckBox}
                                            >
                                                <div className="item-checkbox">
                                                    <PersonalIcon
                                                        demention={36}
                                                        avatar={element.avatar}
                                                        name={element.name}
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

                    {/* ${itemSelected.length > 0 ? '' : 'close'} */}

                    <div className={`list-friend-interact--right ${itemSelected.length > 0 ? '' : 'close'} `}>
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


        </Modal>
    );
}

export default ModalAddMemberToConver;