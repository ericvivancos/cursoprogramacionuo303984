import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { query } from '../../utils/apiUtils'
import Notification from '../Notification';

const EditPresentForm = () => {
    const {id} = useParams();
    console.log(id);
    const [present, setPresent] = useState({
        id: '',
        user_id:'',
        name: '',
        description: '',
        url: 'http://',
        price: ''
    });

    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ type: '', message: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPresent = async () => {
          const token = localStorage.getItem('token');
          try {
            const response = await query('GET', `presents/${id}`, {}, token);
            console.log(response);
            console.log(response.data);
            setPresent(response.data);
            console.log(present);
          } catch (err) {
            setError(err.message);
            setNotification({ type: 'error', message: err.message });
          }
        };
        fetchPresent();
      }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'url' && !value.startsWith('http://')) {
      return;
    }
        setPresent({ ...present, [name]: value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try{
            const presentData = { ...present, price: parseFloat(present.price) };
            const response = await query('PUT',`presents/${id}`,presentData,token);
            if(response.data && response.data.message){
                setNotification({ type: 'success', message: response.data.message });
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
            else{
                setNotification({ type: 'error', message: response.error });
            }
        } catch( error) {
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
<form onSubmit={handleSubmit}>
            <h2>Crear un regalo</h2>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
                <input type="text" id="name" name="name" value={present.name} onChange={handleChange} required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label >Nombre</label>
            </div>
            <div className="form-group">
                <input id="description" name="description" value={present.description} onChange={handleChange} required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label >Descripción</label>
            </div>
            <div className="form-group">
                <input id="url" name="url" value={present.url} onChange={handleChange} placeholder='http://' required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label >Url</label>
            </div>
            <div className="form-group">
                <input type="number" id="price" name="price" value={present.price} onChange={handleChange} required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label >Precio</label>
            </div>
            <div className="form-group"></div>
            <button type="submit">Modificar Regalo</button>
        </form>
        </div>
        
    );
};

export default EditPresentForm;