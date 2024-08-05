import React from 'react'
import { Layout } from 'antd'
import RegisterForm from '../components/RegisterForm'

const {Content} = Layout;

const RegisterPage = () => (
    <Layout>
        <Content style={{padding: '50px', maxWidth: '600px', margin: '0 auto'}}>
            <h2>Crear una cuenta</h2>
            <RegisterForm/>
        </Content>
    </Layout>
);
export default RegisterPage;