import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Table,
  Breadcrumb,
  Divider,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
  Tag,
  Button,
  Drawer,
  Tooltip,
  message,
  Upload,
  Popconfirm,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeTwoTone,
  PlusCircleTwoTone,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import adminApi from "api/adminApi";
import { useHistory } from "react-router";

const { Search } = Input;
const { Column, ColumnGroup } = Table;
StickerGroupPage.propTypes = {};

function StickerGroupPage(props) {
  const [temp, setTemp] = useState("");
  const [tempName, setName] = useState("");
  const [tempDescription, setDescription] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const history = useHistory();
  const [isError, setError] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [file, setFile] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const onFinishFailed = (errorInfo) => {
    
    console.log("Failed:", errorInfo);
  };
  const onSearch = (value) => {
    const filterTable = dataSource.filter(username =>
      Object.keys(username).some(k =>
        String(username[k])
          .toLowerCase()
          .includes(value.toLowerCase())      
      ))
      console.log('table temp',dataTemp)
      console.log('table',filterTable)
      if(value === '' ){
        setDataSource(dataTemp);
      }else{
        setDataSource(filterTable);
      }
      
  };
  const showDrawer1 = () => {
    setVisible1(true);
  };
  const showDrawer2 = (id,name1,description1) => {
    setVisible2(true);
    setTemp(id);
    setName(name1);
    setDescription(description1);

    console.log("id", temp,"values",tempName,tempDescription);
  };
  const showDrawer3 = (id) => {
    setVisible3(true);
    setTemp(id);
    console.log("id", temp);
  };
  const onClose1 = () => {
    setVisible1(false);
    setVisible2(false);
    setVisible3(false); 
    console.log("id close", temp,tempName,tempDescription);
  };
    
  function onShowSizeChange(page, pageSize) {
    console.log(page, pageSize);
  }
  function cancel(e) {
    console.log(e);
    message.error("Click on No");
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (data, row) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn có muốn xoá ?"
            onConfirm={() => handleDeleteGruopSricker(data._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a alt="xoá group sticker">
              <DeleteOutlined />Xoá{" "}
            </a>
          </Popconfirm>
          <a onClick={() => showDrawer2(data._id,data.name,data.description)} >
            <EditOutlined  />Sửa{" "}
          </a>
          <a onClick={() => showDrawer3(data._id)} >
            <PlusCircleTwoTone />Thêm Sticker{" "}
          </a>
          <a
            alt="xem sticker"
            onClick={() => handleViewSticker(data._id, data.stickers)}
          >
            <EyeTwoTone />Xem Sticker{" "}
          </a>
        </Space>
      ),
    },
  ];
  const handleGetAllGruopSricker = async () => {
    try {
      const list = await adminApi.getAllGroupSticker();
      console.log("get all ai ", list);
      return list;
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    handleGetAllGruopSricker()
      .then((result) => {
        setDataSource(result);
        setDataTemp(result);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const handleDeleteGruopSricker = async (id) => {
    try {
      await adminApi.deleteGroupSticker(id);
      message.success("Đã xoá group sticker", 5);   
      setDataSource(await handleGetAllGruopSricker());
    } catch (error) {
      setError(true);
      // message.error("chưa xoá được group sticker", 5);
    }
  };

  useEffect(() => {
    handleDeleteGruopSricker();
  }, []);

  const handleCreatGroupSticker = async (values) => {
    const { name, description } = values;
    try {
      const groupSticker = await adminApi.creatGroupSticker(name, description);
      console.log("result ", groupSticker);
      setDataSource([...dataSource,values])
      message.success("Đã tạo group sticker", 5);
    } catch (error) {
      message.error("chưa tạo được group sticker", 5);
      console.log("fail ");
    }
  };

  const handleUpdateGroupSticker = async (values) => {
    const { name, description } = values;
    try {
      await adminApi.updateGroupSticker(temp, name, description);
      message.success("Đã chỉnh sửa group sticker", 5);
      setDataSource(await handleGetAllGruopSricker());
    } catch (error) {
      console.log("update ", dataSource);
      message.error("lỗi chỉnh sửa group sticker", 5);
    }
  };

  const handleAddSticker = async () => {
    try {
      console.log("file",file)
      for (let index = 0; index < file.length; index++) {
        const element = file[index].originFileObj;
        const frmdata = new FormData();
        frmdata.append("file",element); 
        console.log('formdata',frmdata);
        await adminApi.addSticker(temp, frmdata);

        const list = await adminApi.getAllGroupSticker();
        setDataSource(list);
      };
      message.success("Đã thêm sticker group", 5);
    } catch (error) {
      message.error("chưa thêm được sticker vào group", 5);
    }
  };

  const handleViewSticker = async (_id, stickers) => {
    try {
      history.push({pathname:`/admin/stickers/${_id}`
      ,state:stickers});
      console.log(stickers);
    } catch (error) {
      setError(true);
    }
  };

  const handleFileChange = async ({ file, fileList }) => {
    setFile(fileList);
  };

  return (
    <>
      <div className="ant-col-xs-8">
        <Search placeholder="Gruop Sticker" onSearch={onSearch} enterButton />
      </div>
      <Divider></Divider>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>&ensp; Admin</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Group Sticker</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Divider></Divider>
      <Col offset={20} span={6}>
        <Button
          type="primary"
          placement="right"
          onClick={showDrawer1}
          icon={<PlusOutlined />}
        >
          Add Group Sticker
        </Button>
      </Col>
      {/* tạo mới group sticker */}
      <Drawer
        title="Tạo group sticker"
        width={720}
        onClose={onClose1}
        visible={visible1}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose1}>Cancel</Button>
            <Button onClick={onClose1} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          onFinish={handleCreatGroupSticker}
          onFinishFailed={onFinishFailed}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "điền tên nhóm sticker" }]}
              >
                <Input placeholder="điền tên nhóm sticker" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "mô tả vài thứ !",
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="mô tả vài thứ !" />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Drawer>
      {/* chỉnh sửa group sticker */}
      <Drawer
        title="Update group sticker"
        width={720}
       // onOk={handleOk} 
        //onCancel={onClose1}
        onClose={onClose1}
        visible={visible2}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose1}>Cancel</Button>
            <Button onClick={onClose1} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          onFinish={handleUpdateGroupSticker}
          onFinishFailed={onFinishFailed}
          hideRequiredMark
          initialValues={{
            ['name']:tempName, 
            ['description']:tempDescription,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "điền tên nhóm sticker" }]}
              >
                <Input placeholder="điền tên nhóm sticker" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "mô tả vài thứ !",
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="mô tả vài thứ !"  />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Drawer>
      {/* thêm sticker vào nhóm */}
      <Drawer
        title="Thêm sticker"
        width={720}
        onClose={onClose1}
        visible={visible3}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose1}>Cancel</Button>
            <Button onClick={onClose1} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
      
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            defaultFileList={[...file]}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          <br />
          <br />
          <Button type="primary" onClick={handleAddSticker}>
            Save
          </Button>

      </Drawer>

      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={{
          current:page,
          pageSize:pageSize,
          onShowSizeChange:{onShowSizeChange},
          showSizeChanger:false,
          onChange:(page,pageSize)=>{
          setPage(page);
          setPageSize(pageSize)
          }
        }}
        rowKey={(record) => record._id}
      ></Table>
   
    </>
  );
}

export default StickerGroupPage;
