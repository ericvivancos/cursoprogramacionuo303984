import React, {useState} from 'react';
import {Form, Input, Button, notification} from 'antd';
import {useNavigate} from 'react-router-dom';
import {query} from '../utils/apiUtils';

const RegisterForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        const {email,name,password} = values;
        setLoading(true);
        try{
            const responseData = await query('POST','users',{email,name,password});
            if(responseData.data && responseData.data.message){
                notification.success({
                    message: 'Registro exitoso',
                    description: responseData.data.message,
                });
                form.resetFields();
                navigate('/login');
            } else{
                throw new Error(responseData.error);
            }
        } catch(err){
            notification.error({
                message: 'Error',
                description: err.message,
            });
        }
        setLoading(false);
    };
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
        >
            <Form.Item
                name="email"
                label="Email"
                rules={[{required: true, type :'email', message:'Introduce un correo electrónico'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="name"
                label="Nombre"
                rules={[{required: true, message:'Introduce un nombre'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="password"
                label="Contraseña"
                rules={[{required: true, message:'Introduce una contraseña'}]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' loading={loading}>
                    Registrarse
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;