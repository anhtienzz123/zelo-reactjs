import {
  BellOutlined,
  CheckSquareOutlined,
  ContactsOutlined,
  EditOutlined,
  LogoutOutlined,
  MessageOutlined,
  SettingOutlined,
  StarOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Popover,
  Upload,
  Modal,
  Form,
  message,
  Divider,
  Input,
  Select,
  Space,
  DatePicker,
  Radio,
  Typography,
  Menu,
  Image,
  Dropdown,
  Tag,
} from "antd";
import Text from "antd/lib/typography/Text";
import { setLogin, fetchUserProfile } from "app/globalSlice";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import ImgCrop from "antd-img-crop";
import meApi from "api/meApi";

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
  const [name, setName] = useState("");
  const [isError, setIsError] = useState("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState({
    day: 0,
    month: 0,
    year: 2000,
  });
  const [gender, setGender] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState(false);
  const [imgCover, setImgCover] = useState("");
  //upload
  const [fileList, setFileList] = useState([
    {
      url: user.avatar,
    },
  ]);
  const [coverList, setCoverList] = useState([]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleUpdateProfile();
      setConfirmLoading(false);
    }, 1000);
  };
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
  const handleChangeName = (e) => {
    const value = e.target.value;
    console.log(value);
    setName(value);
  };
  const handleChangeDay = (value) => {
    setDateOfBirth({
      ...dateOfBirth,
      day: value,
    });
  };
  const handleChangeMonth = (value) => {
    setDateOfBirth({
      ...dateOfBirth,
      month: value,
    });
  };
  const handleChangeYear = (value) => {
    setDateOfBirth({
      ...dateOfBirth,
      year: value,
    });
  };
  //radio
  const onChangeRadio = (e) => {
    setGender(e.target.value);
    setValue(e.target.value);
  };
  //update profile
  const handleUpdateProfile = async () => {
    try {
      await meApi.updateProfile(name, dateOfBirth, gender);
      message.success("Cập nhật thành công");
      onCancel(false);
      dispatch(fetchUserProfile());
    } catch (error) {
      setIsError("tên người dùng không được bỏ trống");
      message.error("vui lòng nhập tên người dùng");
    }
  };
  //update avatar
  const handleUpdateAvatar = async () => {
    try {
      for (let index = 0; index < fileList.length; index++) {
        const element = fileList[index].originFileObj;
        const frmdata = new FormData();
        frmdata.append("file", element);
        const linkAvartar = await meApi.updateAvatar(frmdata);
        //message.success("success", 5);
        //onCancel(false);
      }
    } catch (error) {
      console.log("link2", user.avatar);
    }
  };
  //update img-cover
  const handleUpdateImageCover = async () => {
    try {
      for (let i = 0; i < coverList.length; i++) {
        const element = coverList[i].originFileObj;
        const formdata = new FormData();
        formdata.append("file", element);
        const coverImage = await meApi.updateCoverImage(formdata);
        setImgCover(coverImage.coverImage);
      }
      //message.success("success", 5);
    } catch (error) {
      console.log("link2", user.coverImage);
    }
  };

  useEffect(() => {
    setName(user.name);
    setUsername(user.username);
    setDateOfBirth(user.dateOfBirth);
    setImgCover(user.coverImage);
    if (user.gender) {
      setGender(1);
      setValue(1);
    } else {
      setGender(0);
      setValue(0);
    }
  }, [user.avatar]);
  return (
    <Modal
      title="Cập nhật thông tin"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={430}
      confirmLoading={confirmLoading}
    >
      <Form>
        <div className="img-cover" style={{ textAlign: "center" }}>
          <Image width={385} height={145} src={imgCover} />
          {/* ---------------image cover */}
          <div className="img-cover-update" style={{ alignItems: "right" }}>
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
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </div>
        </div>
        <Divider></Divider>
        <Space direction="vertical" style={{ width: 380 }}>
          <Text>Tên</Text>
          <Input
            name="name"
            onChange={handleChangeName}
            placeholder="name"
            value={name}
          ></Input>
          {isError ? (
            <Tag
              color="error"
              style={{
                fontWeight: "normal",
              }}
            >
              {isError}
            </Tag>
          ) : (
            ""
          )}
          <Text>Email/SDT đăng ký</Text>
          <Input
            name="username"
            placeholder="Email/SDT đăng ký"
            value={username}
            disabled
          />
          <Text>Ngày sinh</Text>
          <Space direction="horizontal">
            <Select
              placeholder={user.dateOfBirth.day}
              onChange={handleChangeDay}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
              <Option value="7">7</Option>
              <Option value="8">8</Option>
              <Option value="9">9</Option>
              <Option value="10">10</Option>
              <Option value="11">11</Option>
              <Option value="12">12</Option>
              <Option value="13">13</Option>
              <Option value="14">14</Option>
              <Option value="15">15</Option>
              <Option value="16">16</Option>
              <Option value="17">17</Option>
              <Option value="18">18</Option>
              <Option value="19">19</Option>
              <Option value="20">20</Option>
              <Option value="21">21</Option>
              <Option value="22">22</Option>
              <Option value="23">23</Option>
              <Option value="24">24</Option>
              <Option value="25">25</Option>
              <Option value="26">26</Option>
              <Option value="27">27</Option>
              <Option value="28">28</Option>
              <Option value="29">29</Option>
              <Option value="30">30</Option>
              <Option value="31">31</Option>
            </Select>
            &nbsp;
            <Select
              placeholder={user.dateOfBirth.month}
              onChange={handleChangeMonth}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
              <Option value="7">7</Option>
              <Option value="8">8</Option>
              <Option value="9">9</Option>
              <Option value="10">10</Option>
              <Option value="11">11</Option>
              <Option value="12">12</Option>
            </Select>
            &nbsp;
            <Select
              placeholder={user.dateOfBirth.year}
              onChange={handleChangeYear}
            >
              <Option value="1962">1962</Option>
              <Option value="1963">1963</Option>
              <Option value="1964">1964</Option>
              <Option value="1965">1965</Option>
              <Option value="1966">1966</Option>
              <Option value="1967">1967</Option>
              <Option value="1968">1968</Option>
              <Option value="1969">1969</Option>
              <Option value="1970">1970</Option>
              <Option value="1971">1971</Option>
              <Option value="1972">1972</Option>
              <Option value="1973">1973</Option>
              <Option value="1974">1974</Option>
              <Option value="1975">1975</Option>
              <Option value="1976">1976</Option>
              <Option value="1977">1977</Option>
              <Option value="1978">1978</Option>
              <Option value="1979">1979</Option>
              <Option value="1980">1980</Option>
              <Option value="1981">1981</Option>
              <Option value="1982">1982</Option>
              <Option value="1983">1983</Option>
              <Option value="1984">1984</Option>
              <Option value="1985">1985</Option>
              <Option value="1986">1986</Option>
              <Option value="1987">1987</Option>
              <Option value="1988">1988</Option>
              <Option value="1989">1989</Option>
              <Option value="1990">1990</Option>
              <Option value="1991">1991</Option>
              <Option value="1992">1992</Option>
              <Option value="1993">1993</Option>
              <Option value="1994">1994</Option>
              <Option value="1995">1995</Option>
              <Option value="1996">1996</Option>
              <Option value="1997">1997</Option>
              <Option value="1998">1998</Option>
              <Option value="1999">1999</Option>
              <Option value="2000">2000</Option>
              <Option value="2001">2001</Option>
              <Option value="2002">2002</Option>
              <Option value="1993">2003</Option>
              <Option value="1994">2004</Option>
              <Option value="1995">2005</Option>
              <Option value="1996">2006</Option>
              <Option value="1997">2007</Option>
              <Option value="1998">2008</Option>
              <Option value="1999">2009</Option>
              <Option value="2000">2010</Option>
              <Option value="2001">2011</Option>
              <Option value="2002">2022</Option>
            </Select>
          </Space>
          <Text>Giới tính</Text>
          <Radio.Group onChange={onChangeRadio} value={value}>
            <Radio value={0}>Nam</Radio>
            <Radio value={1}>Nữ</Radio>
          </Radio.Group>
        </Space>
      </Form>
    </Modal>
  );
}

export default ModalUpdateProfile;
