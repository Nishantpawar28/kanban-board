import React from "react";

import "./Modal.css";
import {styled} from "@mui/material/styles";

const ModalStyle = styled("div")(({theme}) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: '100%',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.46)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999999,
}));

const ModalContentStyle = styled("div")(({theme}) => ({
    overflowY: 'auto',
    maxHeight: '95vh',
    backgroundColor: '#fff',
    borderRadius: '3px',
    boxShadow: '1px 1px 20px rgba(0, 0, 0, 0.12)',
}));
//
// .modal_content::-webkit-scrollbar {
//   width: 12px !important,
// }

function Modal(props) {
    return (
        <ModalStyle
            className="modal"
            onClick={() => (props.onClose ? props.onClose() : "")}
        >
            <ModalContentStyle
                className="modal_content custom-scroll"
                onClick={(event) => event.stopPropagation()}
            >
                {props.children}
            </ModalContentStyle>
        </ModalStyle>
    );
}

export default Modal;
