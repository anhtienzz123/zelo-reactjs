import { CaretDownOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './style.scss';
import { GrGroup } from "react-icons/gr";
import { useState } from 'react'
InfoMember.propTypes = {

};

function InfoMember(props) {
    const [isDrop, setIsDrop] = useState(true);
    const styleIconDrop = {

        transform: 'rotate(-90deg)'
    }

    const styleInteract = {
        maxHeight: "0px",
     

    }


    const handleOnClick = () => {
        setIsDrop(!isDrop);
    }

    return (
        <div className="info_member">
            <div
                className="info_member-header"
                onClick={handleOnClick}
            >
                <div className="info_member-header-title">
                    Thành viên nhóm
                </div>

                <div className="info_member-header-icon" style={isDrop ? { } : styleIconDrop}>
                    <CaretDownOutlined />
                </div>
            </div>

            <div className="info_member-interact" style={isDrop ? { } : styleInteract}>
                <div className="info_member-interact-amount">
                    <div className="info_member-interact-amount-icon">
                        <GrGroup />
                    </div>

                    <div className="info_member-interact-amount-text">
                        <span>100</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoMember;