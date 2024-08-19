import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff' }}>
      ©2024 TalentUO. Todos los derechos reservados.
    </Footer>
  );
};

export default CustomFooter;
