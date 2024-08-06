import React, { useContext } from 'react';
import { FriendsContext } from '../context/FriendsContext';
import { Table, Button, Card, Spin } from 'antd';
import Notification from '../components/Notification';

const FriendsList = () => {
  const { friends, removeFriend, loading, notification, setNotification } = useContext(FriendsContext);

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Button type="danger" onClick={() => removeFriend(record.name)}>Eliminar</Button>
      ),
    },
  ];

  const dataSource = friends.map((friend, index) => ({ key: index, name: friend }));

  return (
    <Card title="Amigos" bordered={false}>
      {notification.message && (
        <Notification type={notification.type} message={notification.message} onClose={() => setNotification({ type: '', message: '' })} />
      )}
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      )}
    </Card>
  );
};

export default FriendsList;
