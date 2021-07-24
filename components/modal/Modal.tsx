import React, { useState } from 'react';
import styled from 'styled-components';

export interface ModalProps {
    onClose?: any;
    title?: string;
    top?: Number;
    show?: Boolean;
    closeOnClickOutside?: Boolean;
}

const Modal: React.FC<ModalProps> = ({
    onClose,
    children,
    title,
    show = false,
    top = 100,
    closeOnClickOutside = false
}) => {

    const [visible, SetVisible] = useState<Boolean>(show);

    const CloseModal = (event: any) => {
        if(onClose) onClose(event);
        // SetVisible(false);
    }

    const ClickOutside = (event: any) => {
        if(closeOnClickOutside)
            if(event.target.classList.contains("modal-wrapper"))
                CloseModal(event);
    }

    return (
        <>
            {show && <Wrapper onClick={ClickOutside} topPosition={top} className="modal-wrapper">
                <div className="m-content medium">
                    <div className="m-header">
                        <h5 className="modal-title">{ title }</h5>
                        <button type="button" onClick={CloseModal} className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="m-body">
                        { children }
                    </div>
                    <div className="m-footer"></div>
                </div>
            </Wrapper>}
        </>
    );
}

const Wrapper = styled.div<{ topPosition: any }>`
    &.modal-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: ${props => props.topPosition}px;
        z-index: 999;
    }
    .m-content {
        min-width: 370px;
        min-height: 10px;
        background-color: var(--white);
    }
    .m-header {
        min-height: 60px;
        background-color: var(--dark);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: var(--white);
        align-items: center;
        padding: 5px;
    }
    .modal-title {
        font-size: 16px;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 10px;
    }
    .m-header .close {
        color: white;
        height: 55px;
        width: 55px;
    }
    .m-body {
        padding: 10px;
    }
    .close {
        background-color: transparent;
        border: none;
        font-size: 40px;
        cursor: pointer;
    }
`;



export default Modal;