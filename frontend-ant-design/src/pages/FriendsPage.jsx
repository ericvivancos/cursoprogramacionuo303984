import React from 'react';
import { FriendsProvider } from '../context/FriendsContext';
import AddFriends from '../components/AddFriends';
import FriendsList from '../components/FriendsList';
import { Row, Col } from 'antd';

const FriendsPage = () => {
  return (
    <FriendsProvider>
      <div style={{ padding: '16px' }}>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <AddFriends />
          </Col>
          <Col xs={24} md={16}>
            <FriendsList />
          </Col>
        </Row>
      </div>
    </FriendsProvider>
  );
}

export default FriendsPage;
