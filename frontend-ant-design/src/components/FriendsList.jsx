import React, { useContext } from 'react';
import { FriendsContext } from '../context/FriendsContext';
import { List, Button, Card, Spin } from 'antd';
import Notification from '../components/Notification';

const FriendsList = () => {
  const { friends, removeFriend, loading, notification, setNotification } = useContext(FriendsContext);

  return (
    <Card title="Amigos" bordered={false} style={{ width: 300 }}>
      {notification.message && (
        <Notification type={notification.type} message={notification.message} onClose={() => setNotification({ type: '', message: '' })} />
      )}
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <>
          {friends.length === 0 ? (
            <p>No tienes amigos en tu lista.</p>
          ) : (
            <List
              dataSource={friends}
              renderItem={friend => (
                <List.Item
                  actions={[
                    <Button type="danger" onClick={() => removeFriend(friend)}>Eliminar</Button>
                  ]}
                >
                  {friend}
                </List.Item>
              )}
            />
          )}
        </>
      )}
    </Card>
  );
};

export default FriendsList;
