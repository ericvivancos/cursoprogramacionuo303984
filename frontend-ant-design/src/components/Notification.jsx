import React from 'react'
import {Alert} from 'antd'

const Notification = ({ type, message, onClose}) => (
    <Alert
        message={message}
        type={type}
        showIcon
        closable
        onClose={onClose}
        style={{marginBottom:16 }}
    />
);

export default Notification;