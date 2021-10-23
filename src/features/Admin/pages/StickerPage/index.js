import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import {Table, Breadcrumb, Divider,Form,Col, Row, Input, Select, DatePicker,Space, Tag, Button, Drawer, Tooltip, message, Upload, Popconfirm} from 'antd';
import adminApi from 'api/adminApi'; 
import { DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const { Search } = Input;
const { Column, ColumnGroup } = Table;
StickerPage.propTypes = {};
function StickerPage(props) {
    const dataSticker = props.location.state
    const [isError, setError] = useState(false);
    const history = useHistory();
    const [dataTemp, setDataTemp] = useState();
    const [dataSource, setDataSource] = useState([]);
    const [sticker, setSticker] = useState();

    const match = useRouteMatch();
    const onSearch = (value) => {
        console.log(value);
    }
    function cancel(e) {
        console.log(e);
        message.error("Click on No");
      }

    const columns = [
        {
          title: 'Sticker',
          //dataIndex: 'stickers',
          key: 'stickers',
          render: stickers => (
            <span>
               
                  <a key={stickers} >
                    <img width="125px" height="50px" src={stickers} border= "1px solid black" /> 
                    <br/>
                  </a>
            </span>
          ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (stickers, data,row) => (
              <Space size="middle">
                <Popconfirm title="Bạn có muốn xoá ?" onConfirm={()=>handleDeleteSticker(stickers)} onCancel={cancel} okText="Yes" cancelText="No">
                <a  alt="xoá group sticker" ><DeleteOutlined />  </a>
                </Popconfirm>
              </Space>
            ),
          },
      ];
      


const handleGetAllGruopSricker = async () => {
    try {
      const list = await adminApi.getAllGroupSticker();
      return list;
    } catch (error) {
      setError(true);
    }
  };      

  const handleGetAllSricker = async () => {
    try {
        dataSource.map((result1) => {
            setSticker(result1.stickers);
            console.log("Ai",result1.stickers)
        });
          return sticker;
    } catch (error) {
      setError(true);
    }
  };   
  
  useEffect(() => {
        handleGetAllGruopSricker()
          .then((result) => {
              setDataSource(result);})
          .catch((err) => {
            throw err;
          });
      }, []);

  const handleDeleteSticker=  (stickers)=>{
       try {
        adminApi.deleteSticker(id,stickers);  
    //     history.push({pathname:`/admin/stickers/${id}`
    //    ,state:dataTemp});  
        history.push(`/admin/stickers`); 
        message.success('Đã xoá sticker', 5);
       //window.location.reload();
         } catch (error) {
       message.error('chưa xoá được sticker', 5);
       console.log("fail ")
   }     
};    
  useEffect(() => {
    handleGetAllSricker()
    .then((result) => {
        setDataTemp(result);})
    .catch((err) => {
      throw err;
    });
      }, []);



const handleGetAll= async ()=>{
    try {
    console.log('sticker',dataTemp);
      } catch (error) {
}     
};

    const { id } = match.params;
    return( <>
        <div className="ant-col-xs-8">
             <Search placeholder="Stickers" onSearch={onSearch} enterButton />
        </div>
             <Divider></Divider>
        <div>
             <Breadcrumb>
             <Breadcrumb.Item>&ensp; Admin</Breadcrumb.Item>
             <Breadcrumb.Item>
                   <a href="">Group Sticker</a>
             </Breadcrumb.Item>
             <Breadcrumb.Item>
                   <a href="">Stickers</a>
             </Breadcrumb.Item>
             </Breadcrumb>
        </div>
  
        <Divider></Divider>
    
    <Table 
          dataSource={dataSticker} 
          columns={columns} 
          bordered
          rowKey={record => record.stickers}
           ></Table> 

<Button type="primary" placement="right" onClick={handleGetAll}>
        set Sticker
      </Button>
    </>);
}

export default StickerPage;
