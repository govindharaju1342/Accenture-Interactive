import React from 'react'
import { Layout } from 'antd'
const { Header, Footer, Content } = Layout
import './App.css'

const App: React.FC = () => {
  return (
    <Layout className='layout'>
      <Header>
        <div className='logo'>
          <img src='/logo.png' alt='logo' />
        </div>
      </Header>
      <Content className='content'>content</Content>
      <Footer className='footer'>©{2022} Created by Accenture</Footer>
    </Layout>
  )
}

export default App
