// ConfirmationModal.jsx
import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm,bidAmount }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <h1 style={{color:'red',margin:'0 0 20px 0'}}>입찰 확인</h1>
                <p>{`${bidAmount}원에 입찰하시겠습니까?`}</p>
                <button className="confirm-button" onClick={onConfirm}>Yes</button>
                <button className="cancel-button" onClick={onClose}>No</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
