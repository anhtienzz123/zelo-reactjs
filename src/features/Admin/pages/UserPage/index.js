import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu,Breadcrumb,message, Divider, Table,Input, Space, Button, Card, Tag, Alert, Popconfirm } from 'antd';
import adminApi from 'api/adminApi';
import { setLoading } from 'features/Account/accountSlice';
import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import loginApi from 'api/loginApi';


const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 20;
UserPage.propTypes = {};
const { Search } = Input;
const { Column, ColumnGroup } = Table;

function UserPage(props) {

    const dispatch = useDispatch(); 
    const history = useHistory();
    const [isError, setError] = useState(false);
   
    const [dataSource,setDataSource] = useState([]);
    const onSearch = (value) => {
        console.log(value);
    }


    function confirm(e) {
      console.log(e);
      message.success('Click on Yes');
    }
    
    function cancel(e) {
      console.log(e);
      message.error('Click on No');
    }
    
    const columns = [
     
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'User Name',
          dataIndex: 'username',
          key: 'username',
        },
         {
          title: 'Giới Tính',
          dataIndex: 'gender',
          key: 'gender',
          render: (gender => (
            <>
              {gender ? (
                  <p>nam</p>
                        ) : (
                  <p>nữ</p>      
                       )}
            </>
         )),
        },
        {
          title: 'Trạng Thái Kích Hoạt',
          key: 'isActived',
          dataIndex: 'isActived',
          render: (isActived,data,row) => (
            <>
              {isActived ?(     
                  <Tag color="blue" >đã kích hoạt</Tag>
                  ):
                  ( 
                    <Tag color="red" >chưa kích hoạt </Tag>)
                  }
            </>
         ),
        },
        {
          title: 'trạng thái hoạt động',
          key: 'isDeleted',
          dataIndex: 'isDeleted',
          render: (isDeleted,data,row) => (
            <>
              {isDeleted ?(    
                  <Dropdown overlay={( <Menu>
                    <Menu.Item>
                      <Popconfirm title="Bạn có muốn huỷ kích hoạt?" onConfirm={()=>handleUpdateDelete(data._id,0)} onCancel={cancel} okText="Yes" cancelText="No">
                      <a >bỏ kích hoạt</a>
                      </Popconfirm>
                    </Menu.Item>
                    </Menu> )}  arrow>
                     <Tag color="blue" >đã kích hoạt</Tag>
                  </Dropdown>):
                  ( <Dropdown overlay={(<Menu>
                    <Menu.Item>
                    <Popconfirm title="Bạn có muốn hoạt ?" onConfirm={()=>handleUpdateDelete(data._id,1)} onCancel={cancel} okText="Yes" cancelText="No">
                    <a >kích hoạt </a>
                    </Popconfirm>
                    </Menu.Item>
                  </Menu>)}  arrow>
                    <Tag color="red" >không kích hoạt </Tag>
                    </Dropdown>)
                  }
            </>
         ),
        },
        {
          title: 'Quyền hạn',
          dataIndex: 'isAdmin',
          key: 'isAdmin',
          render: (isAdmin => (
            <>
              {isAdmin ? (
                  <p>admin</p>
                        ) : (
                  <p>user</p>      
                       )}
            </>
         )),
        },
        // {
        //   title: 'Action',
        //   key: 'action',
        //   render: ( data,row) => (
        //     <Space size="middle">
        //       <a onClick={()=>handlegetusre(data)} >get user on row </a>
        //     </Space>
        //   ),
        // },
      ];
    const handleGetAllUsser= async ()=>{
      try {
              const listUser = await adminApi.getListUsers(DEFAULT_PAGE,DEFAULT_SIZE);     
              console.log("get all ",listUser.data)
              return listUser.data;
      } catch (error) {
              setError(true);
          }     
    };


    useEffect(()=>{
       handleGetAllUsser()
      .then(result=>{setDataSource(result);})
      .catch(err => {throw err})
    },[]
    );
    const handleUpdateActive= async (id,isActived)=>{
        try {
            dispatch(setLoading(true));
            await adminApi.active(id,isActived);
            console.log('success');
            message.success('Đã đổi trạng thái', 5);
            history.push('/chat');
        } catch (error) {
            setError(true);
            console.log('fail');  
            message.error('Tài khoản đang đăng nhập....! không thể đổi trạng thái', 5);
        }
        dispatch(setLoading(false));
    };
    const handleUpdateDelete= async (id,isDeleted)=>{
      try {
          dispatch(setLoading(true));
          await adminApi.delete(id,isDeleted);
          console.log('success');
          message.success('Đã đổi trạng thái', 5);
          window.location.reload();
      } catch (error) {
          setError(true);
          console.log('fail');  
          message.error('Tài khoản đang đăng nhập....! không thể đổi trạng thái', 5);
      }
      dispatch(setLoading(false));
  };

  return(   
    <>
    <div className="ant-col-xs-8">
         <Search placeholder="SĐT/Email người dùng" onSearch={onSearch} enterButton />
    </div>
         <Divider></Divider>
    <div>
         <Breadcrumb>
         <Breadcrumb.Item> &ensp; Admin {}</Breadcrumb.Item>
         <Breadcrumb.Item>
               <a href="">User</a>
         </Breadcrumb.Item>
         </Breadcrumb>
    </div>
    <Divider></Divider>
    <Table 
          dataSource={dataSource} 
          columns={columns} 
          bordered
          rowKey={record => record._id}
           ></Table>  
    </>
  );
}
export default UserPage;
