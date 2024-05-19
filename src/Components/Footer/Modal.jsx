import React from 'react';
import './Modal.css'; // Ensure you have this CSS file for styling

const Modal = ({ isOpen, close, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={close}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
                <button onClick={close} className="close-button">Close</button>
            </div>
        </div>
    );
};

export default Modal;