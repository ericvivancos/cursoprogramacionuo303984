import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { query } from '../utils/apiUtils';
import Notification from './Notification';
import { Form, Input, Button, Typography, notification } from 'antd';

const { Title } = Typography;

const CreatePresentForm = () => {
    const [present, setPresent] = useState({
        name: '',
        description: '',
        url: 'http://',
        price: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [notificationState, setNotificationState] = useState({ type: '', message: '' });

    const validateFields = (name, value) => {
        const newErrors = { ...errors };
        if (name === 'name' && value.length < 3) {
            newErrors.name = 'El nombre debe tener al menos 3 caracteres';
        } else if (name === 'name') {
            delete newErrors.name;
        }
        if (name === 'description' && value.length < 5) {
            newErrors.description = 'La descripción debe tener al menos 5 caracteres';
        } else if (name === 'description') {
            delete newErrors.description;
        }
        if (name === 'url' && !/^https?:\/\/.+/.test(value)) {
            newErrors.url = 'La URL debe comenzar con "http://" o "https://"';
        } else if (name === 'url') {
            delete newErrors.url;
        }
        if (name === 'price' && !/^(\d+([.,]\d{1,2})?)$/.test(value)) {
            newErrors.price = 'El precio no es válido';
        } else if (name === 'price') {
            delete newErrors.price;
        }
        setErrors(newErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        validateFields(name, value);
        setPresent({ ...present, [name]: value });
    };

    const handleFinish = async () => {
        const token = localStorage.getItem('token');
        try {
            const presentData = { ...present, price: parseFloat(present.price.replace(',', '.')) };
            const response = await query('POST', 'presents', presentData, token);
            if (response.data && response.data.message) {
                setNotificationState({ type: 'success', message: response.data.message });
                notification.success({
                    message: 'Success',
                    description: response.data.message,
                });
                setPresent({
                    name: '',
                    description: '',
                    url: 'http://',
                    price: ''
                });
                setTimeout(() => {
                    navigate('/presents');
                }, 2000);
            }
        } catch (err) {
            setNotificationState({ type: 'error', message: err.message });
            notification.error({
                message: 'Error',
                description: err.message,
            });
        }
    };

    const clearNotification = () => {
        setNotificationState({ type: '', message: '' });
    };

    return (
        <div>
            {notificationState.message && (
                <Notification type={notificationState.type} message={notificationState.message} onClose={clearNotification} />
            )}
            <Title level={2}>Crear un regalo</Title>
            <Form layout="vertical" onFinish={handleFinish} className="myshadow">
                <Form.Item
                    label="Nombre"
                    validateStatus={errors.name ? 'error' : ''}
                    help={errors.name}
                >
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={present.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Item>
                <Form.Item
                    label="Descripción"
                    validateStatus={errors.description ? 'error' : ''}
                    help={errors.description}
                >
                    <Input
                        id="description"
                        name="description"
                        value={present.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Item>
                <Form.Item
                    label="Url"
                    validateStatus={errors.url ? 'error' : ''}
                    help={errors.url}
                >
                    <Input
                        id="url"
                        name="url"
                        value={present.url}
                        onChange={handleChange}
                        placeholder='http://'
                        required
                    />
                </Form.Item>
                <Form.Item
                    label="Precio (válido 0,00 y 0.00)"
                    validateStatus={errors.price ? 'error' : ''}
                    help={errors.price}
                >
                    <Input
                        type="text"
                        id="price"
                        name="price"
                        value={present.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={Object.keys(errors).length > 0}>
                        Crear Regalo
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreatePresentForm;
