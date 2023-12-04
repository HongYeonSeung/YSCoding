import React from 'react';
import DaumPostcode from "react-daum-postcode";

const PopupPostCode = (props) => {
    // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        props.onClose()
    }

    const postCodeStyle = {
        display: "block",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        border: "5px #000 solid",
    };


    const postCode_btn_Style = {
        position: "fixed",
        top: "85%",
        right: "39.5%",
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        background:"red",
        border: "1px solid #000", // 테두리 설정
    };


    return(
        <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            <button style={postCode_btn_Style} type='button' onClick={() => {props.onClose()}} className='postCode_btn'>닫기</button>
        </div>
    )
}

export default PopupPostCode;