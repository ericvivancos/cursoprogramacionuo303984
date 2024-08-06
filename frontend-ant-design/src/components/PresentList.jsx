import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { query } from '../utils/apiUtils';
import Notification from './Notification';
import { List, Card, Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

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
      {notification.message && (
        <Notification type={notification.type} message={notification.message} onClose={clearNotification} />
      )}
      <Title level={2}>Lista de Regalos</Title>
      {error && <p className="error">{error}</p>}
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={presents}
        renderItem={(present) => (
          <List.Item>
            <Card title={present.name} extra={`${present.price}€`}>
              <Paragraph>{present.description}</Paragraph>
              <Paragraph>{present.url}</Paragraph>
              <Button type="primary" onClick={() => handleEdit(present.id)} style={{ marginRight: 8 }}>
                Editar
              </Button>
              <Button type="danger" onClick={() => handleDelete(present.id)}>
                Eliminar
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PresentList;
