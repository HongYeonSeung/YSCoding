import React from 'react';



const DeleteModal = ({ isOpen, onClose, onConfirm,productName }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <h1 style={{color:'red',margin:'0 0 20px 0'}}>삭제 확인</h1>
                <p>{`${productName}상품을 삭제하시겠습니까?`}</p>
                <button className="confirm-button" onClick={onConfirm}>삭제</button>
                <button className="cancel-button" onClick={onClose}>취소</button>
            </div>
        </div>
    );
};

export default DeleteModal;