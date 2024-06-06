import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { query } from '../../utils/apiUtils';
import Notification from '../Notification';

const PresentList = () => {
  const [presents, setPresents] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPresents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await query('GET', 'presents', {}, token);
        setPresents(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPresents();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await query('DELETE', `presents/${id}`, {}, token);
      setPresents(presents.filter((present) => present.id !== id));
      setNotification({ type: 'success', message: 'Regalo eliminado exitosamente' });
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    }
  };
  const handleEdit = (id) => {
    navigate(`/presents/edit/${id}`);
  };
  const clearNotification = () => {
    setNotification({ type: '', message: '' });
  };
  return (
    <div>
      {notification.message && <Notification type={notification.type} message={notification.message} onClose={clearNotification} />}
      <h2>Lista de Regalos</h2>
      {error && <p className="error">{error}</p>}
      <section className='w-full'>
        <div className="container grid gap-6 px-4">
            <div className="flex flex-col items-center gap-4">
            <ul className="grid gap-8 grid-cols-4">
        {presents.map((present) => (
          <li className="grid gap-4 myshadow" key={present.id}>
            <div className="text-left px-4 grid gap-2.5 relative">
                <a className='absolute z-10 inset-0' href="#"></a>
                <div className="grid gap-1">
                    <div className="flex items-center gap-4">
                        <h3 className='font-semibold'>{present.name}</h3>
                        <h4 className='font-semibold ml-auto'>{present.price}€</h4>
                    </div>
                    <p className="text-sm leading-none ">{present.description}</p>
                    <p className="text-sm leading-none ">{present.url}</p>
                </div>
            </div>
            <div className="px-4 flex gap-2">
                <button onClick={() => handleEdit(present.id)}>Editar</button>
                <button onClick={() => handleDelete(present.id)}>Eliminar</button>
            </div>           
          </li>
        ))}
      </ul>
            </div>
        </div>
      </section>
      
    </div>
  );
};

export default PresentList;
