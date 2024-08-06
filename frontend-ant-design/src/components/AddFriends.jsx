import React, { useState, useContext } from "react";
import { FriendsContext } from "../context/FriendsContext";
import { Form, Input, Button, Card, notification, message } from "antd";
import Notification from '../components/Notification';
const AddFriends = () => {
  const [email, setEmail] = useState("");
  const {
    addFriend,
    notification: contextNotification,
    setNotification,
  } = useContext(FriendsContext);

  const handleSubmit = async () => {
    await addFriend(email);
    setEmail("");
    setTimeout(() => {
      setNotification({ type: "", message: "" });
    }, 2000);
  };

  return (
    <Card title="Añadir Amigos" bordered={false} style={{ width: 300 }}>
      {notification.message && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification({ type: "", message: "" })}
        />
      )}
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Por favor introduce un correo" }]}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Añadir Amigo
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default AddFriends;
