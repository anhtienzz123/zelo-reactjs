import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu,Breadcrumb,message, Divider, Table,Input, Space, Button, Card, Tag, Alert, Popconfirm, Pagination } from 'antd';
import adminApi from 'api/adminApi';
import { setLoading } from 'features/Account/accountSlice';
import 'antd/dist/antd.css';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import loginApi from 'api/loginApi';
import commonFuc from "utils/commonFuc";

UserPage.propTypes = {};
const { Search } = Input;
const { Column, ColumnGroup } = Table;

function UserPage(props) {

    const dispatch = useDispatch(); 
    const history = useHistory();
    const [isError, setError] = useState(false);
    const [size, setSize] = useState(20);
    const [totalPage, setTotalPage] = useState(0);
    const [dataTemp, setDataTemp] = useState([]);
    const [dataSource,setDataSource] = useState([]);
    
    const [query, setQuery] = useState({
      page:0,
      size: 20,
    });

    const onchange =(page)=>{  
      handleGetAllUsser(page-1,query.size)
      .then(result=>{ 
          setDataSource(result); 
      });
     
    }
    const onSearch = (value,page) => {
        handleGetAllUserByUserName(value,page-1,query.size)
        .then(result=>{ 
            setDataSource(result); 
            console.log('page',dataSource,'value',value);
        });
    };
    const confirm=(e)=> {
      console.log(e);
      message.success('Click on Yes');
    }
    const cancel=(e)=> {
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
         // onFilter: (value, record) => record.isAdmin.indexOf(value) === 0,
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
    ];
    const handleGetAllUsser= async (page,pageSize)=>{
      try {
              const listUser = await adminApi.getListUsers(page,pageSize);    
              setTotalPage(listUser.totalPages); 
              return listUser.data;
      } catch (error) {
              setError(true);
          }     
    };   
    const handleGetAllUserByUserName= async (username,page,pageSize)=>{
      try {
              const listUserByUserName = await adminApi.getListUsersByUserName(username,page,pageSize);    
              setTotalPage(listUserByUserName.totalPages); 
              return listUserByUserName.data;
      } catch (error) {
              setError(true);
          }     
    };  
       
    useEffect(()=>{
       handleGetAllUsser(query.page,query.size)
      .then(result=>{
        setDataSource(result);
        setDataTemp(result); 
      })
      .catch(err => {throw err})
    },[]
    ); 
    const handleUpdateDelete= async(id,isDeleted)=>{
      try {
          dispatch(setLoading(true));
          await adminApi.delete(id,isDeleted);
          const listUser = await adminApi.getListUsers(query);     
          setDataSource(listUser.data);
          message.success('Đã đổi trạng thái', 5);        
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
          dataSource={commonFuc.addSTTForList(dataSource, query.page * query.size)} 
          columns={columns} 
          pagination={false}
          bordered
    ></Table>  
    <div style={{ textAlign: "right" }}>
    <Pagination
       showQuickJumper
       defaultCurrent={query.page+1}
       total={totalPage * 10}
       onChange={onchange}  
/>
    </div>
    </>
  );
}
export default UserPage;
