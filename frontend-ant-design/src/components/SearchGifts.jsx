import React, { useState, useContext } from 'react';
import { GiftContext } from '../context/GiftContext';
import Notification from './Notification';
import { Form, Input, Button, Card, Typography, List, Spin, Descriptions } from 'antd';

const { Title, Paragraph } = Typography;

const SearchGifts = () => {
    const { gifts, loading, fetchGiftsByEmail, selectGift, notification, setNotification } = useContext(GiftContext);
    const [email, setEmail] = useState('');

    const handleSearch = async () => {
        await fetchGiftsByEmail(email);
    };

    const handleSelectGift = async (presentId) => {
        await selectGift(presentId);
    };

    return (
        <div className="container">
            {notification.message && (
                <Notification type={notification.type} message={notification.message} onClose={() => setNotification({ type: '', message: '' })} />
            )}
            <Card className="myshadow" title={<Title level={2}>Buscar Regalos</Title>}>
                <Paragraph>Introduce el correo del usuario para buscar sus regalos</Paragraph>
                <Form layout="vertical" onFinish={handleSearch}>
                    <Form.Item
                        label="Email"
                        validateStatus={email ? '' : 'error'}
                        help={email ? '' : 'Por favor, introduce un correo electrónico válido.'}
                    >
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Buscar Regalos</Button>
                    </Form.Item>
                </Form>
                {loading ? (
                    <Spin tip="Cargando regalos..." />
                ) : (
                    gifts && gifts.length > 0 ? (
                        <List
                            itemLayout="horizontal"
                            dataSource={gifts}
                            renderItem={gift => (
                                <List.Item actions={[<Button onClick={() => handleSelectGift(gift.id)}>Seleccionar</Button>]}>
                                    <Descriptions title={gift.name}>
                                        <Descriptions.Item label="Descripción">{gift.description}</Descriptions.Item>
                                        <Descriptions.Item label="URL">{gift.url}</Descriptions.Item>
                                        <Descriptions.Item label="Elegido por">{gift.chosen_by}</Descriptions.Item>
                                        <Descriptions.Item label="Precio">{gift.price}</Descriptions.Item>
                                    </Descriptions>
                                </List.Item>
                            )}
                        />
                    ) : (
                        <Paragraph>No se encontraron regalos.</Paragraph>
                    )
                )}
            </Card>
        </div>
    );
};

export default SearchGifts;
