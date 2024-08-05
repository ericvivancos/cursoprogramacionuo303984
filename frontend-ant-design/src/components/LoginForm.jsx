import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Input, Button, Alert} from 'antd'
import { query } from '../utils/apiUtils';
import {AuthContext} from '../context/AuthContext';

const LoginForm = () => {
    const [error, setError] = useState('');
    const [loading,setLoading] = useState(false);
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const onFinish = async(values) => {
        const {email, password} = values;
        setError('');
        setLoading(true);

        try{
            const responseData = await query('POST','users/login',{email, password});
            if (responseData.data && responseData.data.apiKey) {
                console.log(responseData.data.apiKey);
                login(responseData.data.apiKey);
                navigate('/home');
            }
            else {
                throw new Error(responseData.error);
            }
        } catch(err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
        <h2>Iniciar Sesión</h2>
        {error && <Alert message={error} type="error" showIcon />}
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 400, margin: '0 auto' }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Por favor, introduce tu email' }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Por favor, introduce tu contraseña' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
};
export default LoginForm;