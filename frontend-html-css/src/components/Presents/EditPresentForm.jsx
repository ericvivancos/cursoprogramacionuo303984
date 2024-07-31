import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { query } from '../../utils/apiUtils';
import Notification from '../Notification';

const EditPresentForm = () => {
    const { id } = useParams();
    const [present, setPresent] = useState({
        id: '',
        user_id: '',
        name: '',
        description: '',
        url: 'http://',
        price: ''
    });

    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({ type: '', message: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPresent = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await query('GET', `presents/${id}`, {}, token);
                setPresent(response.data);
            } catch (err) {
                setNotification({ type: 'error', message: err.message });
            }
        };
        fetchPresent();
    }, [id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const presentData = { ...present, price: parseFloat(present.price.replace(',', '.')) };
            const response = await query('PUT', `presents/${id}`, presentData, token);
            if (response.data && response.data.message) {
                setNotification({ type: 'success', message: response.data.message });
                setTimeout(() => {
                    navigate('/presents');
                }, 2000);
            } else {
                setNotification({ type: 'error', message: response.error });
            }
        } catch (error) {
            setNotification({ type: 'error', message: error.message });
        }
    };

    const clearNotification = () => {
        setNotification({ type: '', message: '' });
    };

    return (
        <div>
            {notification.message && (
                <Notification type={notification.type} message={notification.message} onClose={clearNotification} />
            )}
            <form className='myshadow' onSubmit={handleSubmit}>
                <h2>Modificar un regalo</h2>
                <div className="form-group">
                    <input type="text" id="name" name="name" value={present.name} onChange={handleChange} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Nombre</label>
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <input id="description" name="description" value={present.description} onChange={handleChange} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Descripción</label>
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>
                <div className="form-group">
                    <input id="url" name="url" value={present.url} onChange={handleChange} placeholder='http://' required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Url</label>
                    {errors.url && <p className="error">{errors.url}</p>}
                </div>
                <div className="form-group">
                    <input type="text" id="price" name="price" value={present.price} onChange={handleChange} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Precio</label>
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>
                <div className="form-group"></div>
                <button type="submit" disabled={Object.keys(errors).length > 0}>Modificar Regalo</button>
            </form>
        </div>
    );
};

export default EditPresentForm;
